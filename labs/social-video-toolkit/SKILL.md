---
name: social-video-toolkit
description: Download social-platform videos and extract analysis artifacts from them. Use when the user asks to download/save a video from Xiaohongshu, Douyin, TikTok, Bilibili, Weibo, or other share URLs; extract subtitles or spoken transcripts; read burned-in captions; generate key frames/contact sheets; or prepare a social video for content, editing, or workflow analysis.
---

# Social Video Toolkit

## Overview

Use this skill to turn a social video URL or local video file into local assets for analysis: the downloaded video, audio, ASR draft, sampled frames, bottom-caption crops, contact sheets, optional OCR output, and a JSON summary.

Prefer the bundled script over ad hoc commands. It keeps download, transcript, frame sampling, and visual review artifacts in one repeatable workflow.

## Workflow

1. If the user gives a URL, run `analyze` unless they only asked to save the video.
2. If the user gives a local video, run `extract`.
3. Read `summary.json` and `transcript_raw.txt` when available.
4. Open `subtitle_contact.jpg` first for burned-in captions, then `contact.jpg` or individual frames for visual context.
5. Return clean subtitle copy or analysis, stating whether it came from ASR, OCR, visual review, metadata, or a combination.

Do not store cookie values, tokens, passwords, or browser cookie exports in project docs. `--cookies-from-browser chrome` is acceptable because `yt-dlp` reads the local browser profile only for the current run.

## Quick Commands

脚本路径（Cursor）：`~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py`  
脚本路径（Codex）：`~/.agents/skills/social-video-toolkit/scripts/social_video_toolkit.py`

Download and analyze a social video URL:

```bash
python3 ~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py analyze \
  "https://example.com/share/video" \
  --output-dir .tmp/social-video-downloads \
  --analysis-dir .tmp/social-video-analysis
```

Use logged-in Chrome cookies when the platform requires access:

```bash
python3 ~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py analyze \
  "https://www.xiaohongshu.com/explore/..." \
  --cookies-from-browser chrome \
  --output-dir .tmp/social-video-downloads \
  --analysis-dir .tmp/social-video-analysis
```

Only download:

```bash
python3 ~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py download \
  "https://weibo.com/..." \
  --output-dir .tmp/social-video-downloads
```

Analyze a local video:

```bash
python3 ~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py extract \
  path/to/video.mp4 \
  --output-dir .tmp/social-video-analysis \
  --fps 2 \
  --language zh-CN
```

## Platform Notes

- **Xiaohongshu**: pass the original share URL first. The script automatically tries a normalized PC-feed URL using `/explore/<id>`, `xsec_token`, `xsec_source=pc_feed`, and `note_flow_source=wechat`. Use `--no-url-normalize` only for debugging.
- **Douyin/TikTok**: start with the share URL. If a short link fails, open it once in the browser, copy the expanded URL, then retry with `--cookies-from-browser chrome`.
- **Weibo/Bilibili**: public links often work directly through `yt-dlp`; add browser cookies only when metadata or media access fails.

## Outputs

Download JSON includes:

- `paths`: local media file paths
- `title`, `id`, `extractor`, `duration`
- `requested_url`, `used_url`, `url_candidates`

Analysis outputs include:

- `audio.wav`: mono 16 kHz audio for ASR
- `transcript_raw.txt`: timestamped speech-recognition draft when available
- `frames/frame_*.jpg`: sampled full frames
- `contact.jpg`: full-frame contact sheet
- `subtitle_frames/subtitle_*.jpg`: enlarged bottom subtitle crops
- `subtitle_contact.jpg`: contact sheet optimized for burned-in captions
- `ocr_raw.txt`: tesseract OCR output when available
- `summary.json`: artifact paths, counts, duration, and notes

## Recognition Strategy

Use ASR as a draft, not as final truth. It is useful for clean speech, but can fail on music, platform compression, product names, mixed Chinese/English, or fast cuts.

Use visual review/OCR for burned-in captions because short videos often publish the intended copy directly on screen. If `tesseract` is unavailable or Chinese language data is missing, use `subtitle_contact.jpg` with visual inspection.

For longer videos, lower `--fps` for broad analysis or raise it only around caption-heavy sections. If captions are not at the bottom, rerun with `--skip-subtitle-crops` and use full-frame contact sheets.

## Dependencies

Required:

- Python 3
- `yt-dlp` Python module
- `ffmpeg` and `ffprobe`

Optional:

- `SpeechRecognition` for Google ASR
- `tesseract` plus language data for OCR

If missing, install only what the task needs. For example:

```bash
python3 -m pip install --user yt-dlp SpeechRecognition
```

## Reporting Rules

- Put temporary media and analysis artifacts under `.tmp/` unless the user asks to save them elsewhere.
- Report the exact local video path and key analysis artifact paths.
- Do not claim exact subtitles when only ASR was used.
- When download fails, give the next action: log in to Chrome, retry with expanded URL, update `yt-dlp`, or provide a local file.
