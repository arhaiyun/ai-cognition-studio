#!/usr/bin/env python3
"""Download social videos and extract transcript/caption analysis artifacts."""

from __future__ import annotations

import argparse
import json
import math
import shlex
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import parse_qs, quote, urlencode, urlparse, urlunparse


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, text=True, capture_output=True)


def require_tool(name: str) -> None:
    if shutil.which(name) is None:
        raise SystemExit(f"Missing required tool: {name}")


def ensure_ytdlp() -> None:
    probe = run([sys.executable, "-m", "yt_dlp", "--version"])
    if probe.returncode != 0:
        raise SystemExit(
            "yt-dlp is not installed for this Python. Install with: "
            f"{sys.executable} -m pip install --user yt-dlp"
        )


def xhs_url_candidates(url: str) -> list[str]:
    parsed = urlparse(url)
    if "xiaohongshu.com" not in parsed.netloc or "/explore/" not in parsed.path:
        return [url]

    note_id = parsed.path.rstrip("/").split("/")[-1]
    if not note_id:
        return [url]

    query = parse_qs(parsed.query)
    token = (query.get("xsec_token") or [""])[0]
    candidates = [url]
    if token:
        normalized_query = urlencode({
            "xsec_token": token,
            "xsec_source": "pc_feed",
            "note_flow_source": "wechat",
        })
        normalized = urlunparse((
            parsed.scheme or "https",
            parsed.netloc or "www.xiaohongshu.com",
            f"/explore/{quote(note_id)}",
            "",
            normalized_query,
            "",
        ))
        if normalized not in candidates:
            candidates.append(normalized)
    return candidates


def with_ytdlp_options(cmd: list[str], cookies_from_browser: str, audio_only: bool = False) -> list[str]:
    if cookies_from_browser:
        cmd[3:3] = ["--cookies-from-browser", cookies_from_browser]
    if audio_only:
        cmd[3:3] = ["-x", "--audio-format", "m4a"]
    return cmd


def metadata_for_url(url: str, cookies_from_browser: str) -> tuple[dict, str]:
    info_cmd = [sys.executable, "-m", "yt_dlp", "-J", url]
    with_ytdlp_options(info_cmd, cookies_from_browser)
    info = run(info_cmd)
    if info.returncode == 0 and info.stdout.strip():
        try:
            return json.loads(info.stdout), ""
        except json.JSONDecodeError as exc:
            return {}, f"metadata JSON decode failed for {url}: {exc}"
    return {}, info.stderr.strip()


def download_video(
    url: str,
    output_dir: Path,
    cookies_from_browser: str,
    format_selector: str,
    audio_only: bool = False,
    no_metadata: bool = False,
    no_url_normalize: bool = False,
    print_command: bool = False,
) -> dict:
    ensure_ytdlp()
    output_dir.mkdir(parents=True, exist_ok=True)
    output_template = str(output_dir / "%(extractor_key)s_%(id)s_%(title).80B.%(ext)s")
    candidate_urls = [url] if no_url_normalize else xhs_url_candidates(url)

    metadata: dict = {}
    metadata_error = ""
    metadata_url = ""
    if not no_metadata:
        for candidate in candidate_urls:
            metadata, metadata_error = metadata_for_url(candidate, cookies_from_browser)
            if metadata:
                metadata_url = candidate
                break

    if print_command:
        for candidate in candidate_urls:
            preview_cmd = [
                sys.executable,
                "-m",
                "yt_dlp",
                "-f",
                "bestaudio/best" if audio_only else format_selector,
                "-o",
                output_template,
                "--print",
                "after_move:filepath",
                candidate,
            ]
            with_ytdlp_options(preview_cmd, cookies_from_browser, audio_only)
            print(" ".join(shlex.quote(part) for part in preview_cmd), file=sys.stderr)

    proc: subprocess.CompletedProcess[str] | None = None
    used_url = ""
    errors: list[str] = []
    for candidate in candidate_urls:
        cmd = [
            sys.executable,
            "-m",
            "yt_dlp",
            "-f",
            "bestaudio/best" if audio_only else format_selector,
            "-o",
            output_template,
            "--print",
            "after_move:filepath",
            candidate,
        ]
        with_ytdlp_options(cmd, cookies_from_browser, audio_only)
        proc = run(cmd)
        if proc.returncode == 0:
            used_url = candidate
            break
        errors.append(f"URL failed: {candidate}\n{proc.stderr.strip()}")

    if proc is None or proc.returncode != 0:
        if metadata_error:
            errors.append(f"Metadata probe failed: {metadata_error}")
        raise SystemExit("\n\n".join(errors))

    paths = [line.strip() for line in proc.stdout.splitlines() if line.strip() and not line.startswith("[")]
    return {
        "ok": True,
        "paths": paths,
        "title": metadata.get("title") or metadata.get("fulltitle") or "",
        "id": metadata.get("id") or "",
        "extractor": metadata.get("extractor_key") or metadata.get("extractor") or "",
        "duration": metadata.get("duration"),
        "webpage_url": metadata.get("webpage_url") or metadata_url or used_url or url,
        "requested_url": url,
        "used_url": used_url,
        "url_candidates": candidate_urls,
        "output_dir": str(output_dir),
    }


def probe_duration(media: Path) -> float | None:
    proc = run([
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        str(media),
    ])
    if proc.returncode != 0:
        return None
    try:
        return float(proc.stdout.strip())
    except ValueError:
        return None


def extract_audio(video: Path, audio_path: Path) -> None:
    proc = run([
        "ffmpeg",
        "-y",
        "-i",
        str(video),
        "-vn",
        "-ac",
        "1",
        "-ar",
        "16000",
        str(audio_path),
    ])
    if proc.returncode != 0:
        raise SystemExit(proc.stderr)


def sample_frames(video: Path, frames_dir: Path, fps: float, scale_width: int) -> list[Path]:
    frames_dir.mkdir(parents=True, exist_ok=True)
    for old in frames_dir.glob("frame_*.jpg"):
        old.unlink()
    proc = run([
        "ffmpeg",
        "-y",
        "-i",
        str(video),
        "-vf",
        f"fps={fps},scale={scale_width}:-1",
        str(frames_dir / "frame_%03d.jpg"),
    ])
    if proc.returncode != 0:
        raise SystemExit(proc.stderr)
    return sorted(frames_dir.glob("frame_*.jpg"))


def sample_subtitle_crops(
    video: Path,
    frames_dir: Path,
    fps: float,
    scale_width: int,
    crop_ratio: float,
) -> list[Path]:
    frames_dir.mkdir(parents=True, exist_ok=True)
    for old in frames_dir.glob("subtitle_*.jpg"):
        old.unlink()
    crop_ratio = max(0.1, min(crop_ratio, 0.8))
    proc = run([
        "ffmpeg",
        "-y",
        "-i",
        str(video),
        "-vf",
        f"fps={fps},crop=iw:ih*{crop_ratio}:0:ih*(1-{crop_ratio}),scale={scale_width}:-1",
        str(frames_dir / "subtitle_%03d.jpg"),
    ])
    if proc.returncode != 0:
        raise SystemExit(proc.stderr)
    return sorted(frames_dir.glob("subtitle_*.jpg"))


def make_contact_sheet(frames_dir: Path, contact_path: Path, cols: int = 5) -> None:
    pattern = "frame_*.jpg"
    frames = sorted(frames_dir.glob(pattern))
    if not frames:
        pattern = "subtitle_*.jpg"
        frames = sorted(frames_dir.glob(pattern))
    if not frames:
        return
    rows = max(1, math.ceil(len(frames) / cols))
    proc = run([
        "ffmpeg",
        "-y",
        "-pattern_type",
        "glob",
        "-i",
        str(frames_dir / pattern),
        "-filter_complex",
        f"tile={cols}x{rows}:padding=8:margin=8:color=white",
        "-frames:v",
        "1",
        "-update",
        "1",
        str(contact_path),
    ])
    if proc.returncode != 0:
        raise SystemExit(proc.stderr)


def transcribe_google(audio_path: Path, language: str, chunk_seconds: float) -> tuple[str, str]:
    try:
        import speech_recognition as sr
    except Exception as exc:
        return "", f"SpeechRecognition unavailable: {exc}"

    duration = probe_duration(audio_path)
    recognizer = sr.Recognizer()
    recognizer.dynamic_energy_threshold = True
    try:
        chunks: list[str] = []
        notes: list[str] = []
        with sr.AudioFile(str(audio_path)) as source:
            if not duration or duration <= chunk_seconds:
                audio = recognizer.record(source)
                try:
                    return recognizer.recognize_google(audio, language=language), ""
                except sr.UnknownValueError:
                    return "", "ASR failed: Google could not understand the audio"
                except sr.RequestError as exc:
                    return "", f"ASR failed: Google request error: {exc}"

            start = 0.0
            index = 1
            while start < duration:
                audio = recognizer.record(source, duration=chunk_seconds)
                if len(audio.frame_data) == 0:
                    break
                end = min(duration, start + chunk_seconds)
                try:
                    text = recognizer.recognize_google(audio, language=language)
                    if text.strip():
                        chunks.append(f"[{start:05.1f}-{end:05.1f}] {text.strip()}")
                except sr.UnknownValueError:
                    notes.append(f"ASR chunk {index} empty/unclear ({start:05.1f}-{end:05.1f}s)")
                except sr.RequestError as exc:
                    return "\n".join(chunks), f"ASR failed: Google request error at chunk {index}: {exc}"
                start = end
                index += 1
        if chunks:
            note = "; ".join(notes[:6])
            if len(notes) > 6:
                note += f"; {len(notes) - 6} more unclear chunks"
            return "\n".join(chunks), note
        if notes:
            return "", "; ".join(notes[:8])
        return "", "ASR failed: no audio chunks were recognized"
    except sr.UnknownValueError:
        return "", "ASR failed: Google could not understand the audio"
    except sr.RequestError as exc:
        return "", f"ASR failed: Google request error: {exc}"
    except Exception as exc:
        return "", f"ASR failed: {type(exc).__name__}: {exc}"


def run_tesseract(frames: list[Path], out_path: Path, language: str) -> str:
    if shutil.which("tesseract") is None:
        return "tesseract unavailable"

    chunks: list[str] = []
    for frame in frames:
        proc = run(["tesseract", str(frame), "stdout", "-l", language, "--psm", "6"])
        if proc.returncode == 0 and proc.stdout.strip():
            chunks.append(f"## {frame.name}\n{proc.stdout.strip()}")
    out_path.write_text("\n\n".join(chunks), encoding="utf-8")
    return "" if chunks else "tesseract produced no text"


def extract_video_artifacts(
    video: Path,
    output_dir: Path,
    fps: float,
    scale_width: int,
    subtitle_scale_width: int,
    subtitle_crop_ratio: float,
    language: str,
    ocr_lang: str,
    asr_chunk_seconds: float,
    skip_asr: bool,
    skip_ocr: bool,
    skip_subtitle_crops: bool,
) -> dict:
    require_tool("ffmpeg")
    require_tool("ffprobe")

    video = video.expanduser().resolve()
    if not video.exists():
        raise SystemExit(f"Video not found: {video}")

    output_dir.mkdir(parents=True, exist_ok=True)
    frames_dir = output_dir / "frames"
    subtitle_frames_dir = output_dir / "subtitle_frames"
    audio_path = output_dir / "audio.wav"
    transcript_path = output_dir / "transcript_raw.txt"
    ocr_path = output_dir / "ocr_raw.txt"
    contact_path = output_dir / "contact.jpg"
    subtitle_contact_path = output_dir / "subtitle_contact.jpg"

    duration = probe_duration(video)
    extract_audio(video, audio_path)
    frames = sample_frames(video, frames_dir, fps, scale_width)
    make_contact_sheet(frames_dir, contact_path)

    subtitle_frames: list[Path] = []
    if not skip_subtitle_crops:
        subtitle_frames = sample_subtitle_crops(
            video,
            subtitle_frames_dir,
            fps,
            subtitle_scale_width,
            subtitle_crop_ratio,
        )
        make_contact_sheet(subtitle_frames_dir, subtitle_contact_path)

    notes: list[str] = []
    if not skip_asr:
        transcript, note = transcribe_google(audio_path, language, asr_chunk_seconds)
        if transcript:
            transcript_path.write_text(transcript + "\n", encoding="utf-8")
        if note:
            notes.append(note)

    if not skip_ocr:
        note = run_tesseract(subtitle_frames or frames, ocr_path, ocr_lang)
        if note:
            notes.append(note)

    summary = {
        "ok": True,
        "video": str(video),
        "duration": duration,
        "output_dir": str(output_dir),
        "audio": str(audio_path),
        "transcript_raw": str(transcript_path) if transcript_path.exists() else "",
        "ocr_raw": str(ocr_path) if ocr_path.exists() else "",
        "contact_sheet": str(contact_path) if contact_path.exists() else "",
        "subtitle_contact_sheet": str(subtitle_contact_path) if subtitle_contact_path.exists() else "",
        "frames_dir": str(frames_dir),
        "subtitle_frames_dir": str(subtitle_frames_dir) if subtitle_frames else "",
        "frame_count": len(frames),
        "subtitle_frame_count": len(subtitle_frames),
        "notes": notes,
    }
    (output_dir / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    return summary


def add_download_args(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--output-dir", default=".tmp/social-video-downloads", help="Directory for downloaded files")
    parser.add_argument("--cookies-from-browser", default="", help="Browser name for logged-in cookies, e.g. chrome")
    parser.add_argument("--format", default="bestvideo*+bestaudio/best", help="yt-dlp format selector")
    parser.add_argument("--audio-only", action="store_true", help="Extract audio as m4a")
    parser.add_argument("--no-metadata", action="store_true", help="Skip metadata JSON probe")
    parser.add_argument("--print-command", action="store_true", help="Print yt-dlp commands before running")
    parser.add_argument("--no-url-normalize", action="store_true", help="Disable platform URL normalization/retry")


def add_extract_args(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--output-dir", default=".tmp/social-video-analysis", help="Output directory")
    parser.add_argument("--fps", type=float, default=2.0, help="Frame sampling rate")
    parser.add_argument("--scale-width", type=int, default=480, help="Full-frame JPG width")
    parser.add_argument("--subtitle-scale-width", type=int, default=900, help="Bottom subtitle crop width")
    parser.add_argument("--subtitle-crop-ratio", type=float, default=0.28, help="Bottom frame ratio to crop")
    parser.add_argument("--language", default="zh-CN", help="ASR language, e.g. zh-CN or en-US")
    parser.add_argument("--ocr-lang", default="chi_sim+eng", help="Tesseract language")
    parser.add_argument("--asr-chunk-seconds", type=float, default=12.0, help="Chunk length for Google ASR")
    parser.add_argument("--skip-asr", action="store_true", help="Skip speech recognition")
    parser.add_argument("--skip-ocr", action="store_true", help="Skip tesseract OCR")
    parser.add_argument("--skip-subtitle-crops", action="store_true", help="Skip bottom subtitle crop artifacts")


def main() -> int:
    parser = argparse.ArgumentParser(description="Download social videos and extract subtitle analysis artifacts.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    download_parser = subparsers.add_parser("download", help="Download a social video URL")
    download_parser.add_argument("url", help="Video/share URL")
    add_download_args(download_parser)

    extract_parser = subparsers.add_parser("extract", help="Extract transcript, frames, and OCR artifacts")
    extract_parser.add_argument("video", help="Local video file")
    add_extract_args(extract_parser)

    analyze_parser = subparsers.add_parser("analyze", help="Download a URL then extract analysis artifacts")
    analyze_parser.add_argument("url", help="Video/share URL")
    add_download_args(analyze_parser)
    analyze_parser.add_argument("--analysis-dir", default=".tmp/social-video-analysis", help="Analysis output directory")
    analyze_parser.add_argument("--fps", type=float, default=2.0, help="Frame sampling rate")
    analyze_parser.add_argument("--scale-width", type=int, default=480, help="Full-frame JPG width")
    analyze_parser.add_argument("--subtitle-scale-width", type=int, default=900, help="Bottom subtitle crop width")
    analyze_parser.add_argument("--subtitle-crop-ratio", type=float, default=0.28, help="Bottom frame ratio to crop")
    analyze_parser.add_argument("--language", default="zh-CN", help="ASR language, e.g. zh-CN or en-US")
    analyze_parser.add_argument("--ocr-lang", default="chi_sim+eng", help="Tesseract language")
    analyze_parser.add_argument("--asr-chunk-seconds", type=float, default=12.0, help="Chunk length for Google ASR")
    analyze_parser.add_argument("--skip-asr", action="store_true", help="Skip speech recognition")
    analyze_parser.add_argument("--skip-ocr", action="store_true", help="Skip tesseract OCR")
    analyze_parser.add_argument("--skip-subtitle-crops", action="store_true", help="Skip bottom subtitle crop artifacts")

    args = parser.parse_args()

    if args.command == "download":
        result = download_video(
            args.url,
            Path(args.output_dir).expanduser().resolve(),
            args.cookies_from_browser,
            args.format,
            args.audio_only,
            args.no_metadata,
            args.no_url_normalize,
            args.print_command,
        )
    elif args.command == "extract":
        result = extract_video_artifacts(
            Path(args.video),
            Path(args.output_dir).expanduser().resolve(),
            args.fps,
            args.scale_width,
            args.subtitle_scale_width,
            args.subtitle_crop_ratio,
            args.language,
            args.ocr_lang,
            args.asr_chunk_seconds,
            args.skip_asr,
            args.skip_ocr,
            args.skip_subtitle_crops,
        )
    else:
        download = download_video(
            args.url,
            Path(args.output_dir).expanduser().resolve(),
            args.cookies_from_browser,
            args.format,
            args.audio_only,
            args.no_metadata,
            args.no_url_normalize,
            args.print_command,
        )
        if not download["paths"]:
            raise SystemExit("Download succeeded but no output paths were returned.")
        analysis = extract_video_artifacts(
            Path(download["paths"][0]),
            Path(args.analysis_dir).expanduser().resolve(),
            args.fps,
            args.scale_width,
            args.subtitle_scale_width,
            args.subtitle_crop_ratio,
            args.language,
            args.ocr_lang,
            args.asr_chunk_seconds,
            args.skip_asr,
            args.skip_ocr,
            args.skip_subtitle_crops,
        )
        result = {"ok": True, "download": download, "analysis": analysis}

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
