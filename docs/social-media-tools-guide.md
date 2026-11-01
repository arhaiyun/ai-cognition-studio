---
title: 自媒体素材下载与内容解析使用手册
date: 2026-11-01
status: stable
type: handbook
audience: [self, dev]
tags: [skills, video, transcription, douyin, xiaohongshu, bilibili]
summary: 四套自媒体工具的分工、调用方式、本地 tiny 模型复现、验证结果和常见问题。
---

# 自媒体素材下载与内容解析使用手册

当前视频主入口是 **video-batch-download**：已用真实抖音、小红书视频跑通下载、媒体校验、音频提取和本地转写。原有 social-video-toolkit 用于抽帧、烧录字幕区域裁剪和可选 OCR。名称相近的 social-media-toolkit 是另一个项目，提供独立 CLI / MCP 和可选云转写。

## 按任务选择

| 任务 | 入口 | 当前边界 |
|---|---|---|
| 抖音、小红书、B站视频下载与本地转写 | [video-batch-download](../labs/video-batch-download/) | 公共视频；tiny 默认 CPU/int8；B站此前已通过下载与抽帧验证 |
| 本地视频抽帧、字幕区域图、联系表、可选 OCR | [social-video-toolkit](../labs/social-video-toolkit/) | OCR 需 Tesseract 和语言包；其可选 Google ASR 与本地 tiny 是不同路线 |
| 多平台素材保存为 Markdown、逐字稿笔记 | [content-reader](../labs/content-reader/) | 包含 xhs / bilibili / youtube / twitter 子技能；部分独立 HTTP 链路曾超时，视频优先使用主入口 |
| 图文正文、媒体清单、图片下载及 MCP 读取 | [social-media-toolkit](../labs/social-media-toolkit/) | 小红书图文下载已验证；GetNote、TikHub、火山引擎为可选服务，可能涉及费用 |

三平台所有内容类型并未全部验证：抖音图文尚未实测，B站专栏/动态图文不在当前视频主流程的覆盖范围。

## 在 Agent 中使用

Codex 使用 `$skill-name`；Cursor 可用 `@skill-name` 或对应斜杠命令。直接点名便于避免几个 toolkit 混用。

```text
$video-batch-download 下载并转写这个抖音视频：<公开分享链接>
$video-batch-download 只下载这个小红书视频，不转写：<链接>
$video-batch-download 下载这个 B站视频，并保留原视频：<链接>
$social-video-toolkit 分析这个本地 MP4，抽帧并读取烧录字幕；复用已有语音稿，不调用 Google ASR：<文件路径>
$content-reader 把这篇图文保存为 Markdown，保留原文和图片来源：<链接>
$social-media-toolkit 提取这个小红书图文的正文和图片：<链接>
```

`social-video-toolkit` 的 Codex 配置为手动触发。它的 GitHub 上游最新提交核对结果记录在 [STUDIO-UPSTREAM.json](../labs/social-video-toolkit/STUDIO-UPSTREAM.json)，当前脚本与上游 `9eac8be` 一致。

## 本机终端调用

以下从项目根目录执行。`~/.local/bin/` 已配置命令入口；这些入口属于本机安装，git clone 不会自动创建它们。

```bash
export PATH="$PWD/.tmp/social-media-runtime/bin:$HOME/.local/bin:$PATH"

# 只下载视频
video-batch-download '<公开链接>' --no-transcribe

# 下载并使用已缓存的 tiny 离线转写
HF_HUB_OFFLINE=1 video-batch-download '<公开链接>' --language auto

# 指定保存位置
video-batch-download '<公开链接>' --output "$PWD/.private/my-video-project"

# 原有 toolkit：只提取本地画面与字幕区域，不运行 Google ASR / Tesseract
python labs/social-video-toolkit/scripts/social_video_toolkit.py extract '/绝对路径/视频.mp4' \
  --output-dir .private/my-video-analysis --fps 0.5 --skip-asr --skip-ocr

# 小红书图文正文及图片；--no-text 跳过外部文字提取服务，元数据中的正文仍保留
socialkit capture '<图文链接>' --no-text --media cover,images \
  --output "$PWD/.private/my-image-project"

socialkit doctor
xhs-reader --doctor
```

本机 `video-batch-download` 默认使用本地 tiny 目录、CPU/int8，输出到 `.private/social-media-library/videos/`。请求不会自动读取用户的主浏览器账号；抖音使用独立匿名播放器，小红书优先读取公开 HTML。

## 换机器时复现

准备 Node 20+、uv、FFmpeg 和 ffprobe。下面会创建新的隔离 Python 环境并下载依赖；Python 包源连接不稳定时可显式选择可用镜像。模型下载约 78MB，默认模型选择保留 tiny。

```bash
uv venv --python 3.12 .tmp/social-media-runtime
uv pip install --python .tmp/social-media-runtime/bin/python --only-binary cryptography \
  -r labs/video-batch-download/requirements.txt labs/social-media-toolkit
npm ci --prefix labs/video-batch-download
node labs/video-batch-download/scripts/setup.mjs
export PATH="$PWD/.tmp/social-media-runtime/bin:$PATH"
```

四个模型文件的来源、大小和 SHA-256 已版本化到 [model-manifest.json](../labs/video-batch-download/model-manifest.json)。下载器只在分段、长度与整体哈希核对通过后发布文件，可在中断后恢复：

```bash
python - <<'PY'
import importlib.util
import json
from pathlib import Path

root = Path.cwd()
spec = importlib.util.spec_from_file_location(
    'range_download', root / 'labs/video-batch-download/scripts/range_download.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
manifest = json.loads((root / 'labs/video-batch-download/model-manifest.json').read_text())
for item in manifest['files']:
    module.download(
        manifest['source'] + '/resolve/master/' + item['name'],
        root / manifest['local_directory'] / item['name'],
        expected_sha256=item['sha256'])
PY

# 不依赖本机命令包装器，也可直接运行
HF_HUB_OFFLINE=1 node labs/video-batch-download/scripts/download.mjs '<公开链接>' \
  --model "$PWD/.private/social-media-models/faster-whisper-tiny" \
  --device cpu --compute-type int8 --language auto \
  --output "$PWD/.private/my-video-project"
```

Cursor/Codex 的技能源码以 `labs/` 为准，按 [三端同步说明](../playbooks/skill-dual-install.md) 安装。`social-media-toolkit` 的 stdio 命令为 `social-media-toolkit-mcp`；本机已注册 Cursor 与 Codex。`socialkit doctor` 显示 `partial` 时需区分可选云服务未配置与本地媒体依赖缺失。

## 产物与解析方式

视频任务输出 MP4、元数据 JSON、机器转写 TXT，以及批次 `download-summary.json`。原有 toolkit 可进一步输出 `audio.wav`、全帧图片、字幕裁剪、`contact.jpg`、`subtitle_contact.jpg`、可选 OCR 与 `summary.json`。

本轮还用已下载的 11.58678 秒视频实测了上述 `social-video-toolkit extract` 命令：成功生成 6 张全帧、6 张字幕区域图、两张联系表和 `summary.json`，未调用 Google ASR 或 Tesseract。

解析时分别标注证据来源：正文、ASR、OCR、实际画面、编辑后字幕。tiny 已跑通，但中文误识别明显，不能把机器稿当作准确字幕；对以音乐和画面字幕为主的视频，应读取画面，而不是从少量 ASR 文本推断全文。本轮用户明确选择保留 tiny，未下载 small。

2026-11-01 实测：抖音 71.2 秒、小红书 11.58678 秒视频均完成正常流程及严格整片解码；小红书图文已下载 9 张图片与封面并核对哈希。完整证据、修复前后记录及已知限制见 [安装与验证报告](social-media-tools-validation.md)。这些是指定公开样例的验证结果。

## 常见问题与维护

- **小红书下载中断**：使用原始分享链接。主流程已接入 256KB 分段传输；不完整分块不会被当成最终视频。重新运行可复用未变更源的校验分块。
- **抖音旧分享页解析不到数据**：主流程优先使用官方匿名播放器；已删除、私密等永久内容错误会停止。
- **`metadata_errors` 参数报错**：按 `requirements.txt` 安装兼容 PyAV；本机验证版本为 15.1.0。
- **`t2s.json.json` 报错**：本项目使用纯 Python OpenCC，配置名为 `t2s`。
- **转写一直尝试联网**：确认 `--model` 指向完整本地目录，而不是未下载的模型名称；可用 `HF_HUB_OFFLINE=1` 验证。
- **模型或平台受限**：保留具体失败原因，不用封面、部分 MP4 或无来源文本替代完整视频与逐字稿。

回归命令：

```bash
npm test --prefix labs/video-batch-download
python -m unittest discover -s labs/video-batch-download/test -p test_range_download.py
git diff --check
```

本轮 128 项 Node 测试及 6 项 HTTP 分段测试通过。模型、音视频、原始转写、运行环境和凭证保存在本地 `.private/`、`.tmp/` 或系统配置目录；Git 保存 skill 源码、修复、依赖、模型校验清单和说明文档。
