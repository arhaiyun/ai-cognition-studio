---
title: social-video-toolkit · 社媒视频下载与分析
date: 2026-06-14
status: stable
audience: [self, dev]
tags: [skill, cursor, codex, video, xiaohongshu, douyin, bilibili]
summary: 下载小红书/抖音/B站/微博等分享链接视频，并提取 ASR、帧采样、烧录字幕 OCR 等分析产物。
portfolio:
  order: 3
  label: Automation · Multimodal Tooling
  outcome: 把社媒视频链接转化为可检索、可复盘、可继续分析的多模态素材。
  capabilities: [自动化, ASR, OCR, 媒体处理]
---

# social-video-toolkit

把社媒视频 URL 或本地文件变成可分析素材：视频、音频、转写草稿、关键帧、字幕区域裁剪、contact sheet 与 `summary.json`。

## TL;DR

```bash
# 分析分享链接（临时产物默认放 .tmp/）
python3 ~/.cursor/skills/social-video-toolkit/scripts/social_video_toolkit.py analyze \
  "https://..." \
  --output-dir .tmp/social-video-downloads \
  --analysis-dir .tmp/social-video-analysis
```

需要登录态时加 `--cookies-from-browser chrome`。

## 三端安装

源码在 `labs/social-video-toolkit/`。一键同步：

```bash
cd ~/github/ai-cognition-studio && ./scripts/sync-skill.sh social-video-toolkit
```

### Cursor

`~/.cursor/skills/social-video-toolkit/`（含 `scripts/social_video_toolkit.py`）

### Codex

`~/.agents/skills/social-video-toolkit/`（含 `agents/openai.yaml`）

调用：`$social-video-toolkit 下载并分析这个链接 …`

安装后若未出现，重启 Codex。

## 依赖

- Python 3、`ffmpeg`、`ffprobe`
- `yt-dlp`（`python3 -m pip install yt-dlp`）
- 可选：`SpeechRecognition`、`tesseract`（中文 OCR 需语言包）

## 文件结构

| 路径 | 说明 |
|------|------|
| `SKILL.md` | Agent 工作流与平台说明 |
| `scripts/social_video_toolkit.py` | 下载 / 分析 CLI |
| `agents/openai.yaml` | Codex 展示名与显式触发策略 |

## 来源

上游参考仓库：`github.com/arhaiyun/social-video-toolkit`（或本地 `~/github/social-video-toolkit`）。
