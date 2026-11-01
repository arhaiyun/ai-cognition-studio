#!/usr/bin/env python3
"""Bounded, resumable HTTP byte-range downloads for unreliable public CDNs."""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import time

import requests


class DownloadError(RuntimeError):
    pass


def _range(url, start, end, total, headers, timeout, attempts, validator=None):
    last_error = None
    for attempt in range(attempts):
        try:
            request_headers = {**headers, "Accept-Encoding": "identity", "Range": f"bytes={start}-{end}"}
            if validator:
                request_headers["If-Range"] = validator
            with requests.get(url, headers=request_headers, stream=True, timeout=(timeout, timeout)) as response:
                response.raise_for_status()
                match = re.fullmatch(r"bytes (\d+)-(\d+)/(\d+)", response.headers.get("Content-Range", ""))
                if response.status_code != 206 or not match:
                    raise DownloadError("Server did not return a valid HTTP 206 byte range")
                actual_start, actual_end, actual_total = map(int, match.groups())
                if actual_start != start or actual_end != end or (total is not None and actual_total != total):
                    raise DownloadError("Server returned an unexpected Content-Range")
                if actual_total <= end:
                    raise DownloadError("Invalid total length in Content-Range")
                if validator and response.headers.get("ETag") not in (None, validator):
                    raise DownloadError("Remote media changed during download")
                expected = end - start + 1
                body = bytearray()
                for chunk in response.iter_content(min(65536, expected)):
                    body.extend(chunk)
                    if len(body) > expected:
                        raise DownloadError("Range response exceeds requested length")
                if len(body) != expected:
                    raise DownloadError("Range response ended before all requested bytes arrived")
                return bytes(body), actual_total, response.headers.get("ETag")
        except (requests.RequestException, DownloadError) as exc:
            last_error = exc
            if attempt + 1 < attempts:
                time.sleep(min(0.2 * 2**attempt, 1))
    raise DownloadError(f"Range {start}-{end} failed after {attempts} attempts: {last_error}") from last_error


def download(url, destination, *, chunk_size=262144, workers=4, timeout=12, attempts=3,
             expected_sha256=None, max_bytes=2 * 1024**3, referer=None):
    if chunk_size < 1 or workers < 1 or attempts < 1 or timeout <= 0:
        raise ValueError("chunk_size, workers, attempts and timeout must be positive")
    if not url.startswith(("https://", "http://")):
        raise ValueError("Only HTTP(S) download URLs are supported")
    destination = Path(destination).expanduser().resolve()
    destination.parent.mkdir(parents=True, exist_ok=True)
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36"}
    if referer:
        headers["Referer"] = referer
    _, total, etag = _range(url, 0, 0, None, headers, timeout, attempts)
    if total > max_bytes:
        raise DownloadError(f"Remote file exceeds max_bytes ({total} > {max_bytes})")
    identity = {"url_sha256": hashlib.sha256(url.encode()).hexdigest(), "bytes": total,
                "etag": etag, "chunk_size": chunk_size}
    parts = destination.with_name(destination.name + ".parts")
    manifest = parts / "manifest.json"
    previous = None
    if manifest.exists():
        try:
            previous = json.loads(manifest.read_text())
        except (OSError, ValueError):
            pass
    if previous != identity and parts.exists():
        shutil.rmtree(parts)
    parts.mkdir(exist_ok=True)
    manifest.write_text(json.dumps(identity, indent=2))
    count = (total + chunk_size - 1) // chunk_size

    def fetch_part(index):
        start = index * chunk_size
        end = min(start + chunk_size, total) - 1
        part = parts / f"{index:08d}.chunk"
        checksum = part.with_suffix(".sha256")
        if part.exists() and checksum.exists():
            if part.stat().st_size == end - start + 1 and hashlib.sha256(part.read_bytes()).hexdigest() == checksum.read_text():
                return
        body, _, _ = _range(url, start, end, total, headers, timeout, attempts, etag)
        temporary = part.with_suffix(".tmp")
        temporary.write_bytes(body)
        temporary.replace(part)
        checksum.write_text(hashlib.sha256(body).hexdigest())

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(fetch_part, index) for index in range(count)]
        try:
            for future in as_completed(futures):
                future.result()
        except Exception:
            for future in futures:
                future.cancel()
            raise
    partial = destination.with_name(destination.name + ".assembling")
    digest = hashlib.sha256()
    try:
        with partial.open("wb") as output:
            for index in range(count):
                body = (parts / f"{index:08d}.chunk").read_bytes()
                digest.update(body)
                output.write(body)
        checksum = digest.hexdigest()
        if partial.stat().st_size != total:
            raise DownloadError("Assembled file has an incorrect length")
        if expected_sha256 and checksum.lower() != expected_sha256.lower():
            raise DownloadError("Assembled file SHA-256 does not match the expected model/media hash")
        os.replace(partial, destination)
    finally:
        partial.unlink(missing_ok=True)
    shutil.rmtree(parts)
    return {"status": "success", "path": str(destination), "bytes": total,
            "sha256": checksum, "chunks": count}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url")
    parser.add_argument("output")
    parser.add_argument("--referer")
    parser.add_argument("--sha256")
    parser.add_argument("--chunk-size", type=int, default=262144)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--timeout", type=float, default=12)
    args = parser.parse_args()
    try:
        result = download(args.url, args.output, referer=args.referer, expected_sha256=args.sha256,
                          chunk_size=args.chunk_size, workers=args.workers, timeout=args.timeout)
    except (DownloadError, ValueError, OSError) as exc:
        print(json.dumps({"status": "error", "error": str(exc)}))
        return 1
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
