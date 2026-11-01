# Social media download repair implementation plan

Goal: complete public-video download, local transcription and evidence-based analysis on this Intel Mac, documenting any remaining Douyin access limitation.

Architecture: retain the installed platform parsers and local Whisper server. Add one bounded HTTP Range transfer helper to video-batch-download for CDN streams that stall during a whole-file request. Configure verified model files by local path; keep cloud ASR out of the social-media-toolkit implementation.

1. [x] Write and run failing local-HTTP tests for correct ranges, interrupted requests, rejected malformed responses and resume.
2. [x] Implement `labs/video-batch-download/scripts/range_download.py`; rerun these tests and existing downloader tests.
3. [x] Download a complete Xiaohongshu sample and verified local Whisper model; check exact byte counts, hashes and strict video decode.
4. [x] Inspect Douyin public page/API evidence and repair only the identified parser/navigation issue if an accessible media response exists.
5. [x] Run local transcription and produce a source-linked analysis artifact; update installed skill instructions, sync both runtimes and commit the repair/report.

Validation artifacts stay under `.private/social-media-debug/`; no credentials or downloaded media enter git.
