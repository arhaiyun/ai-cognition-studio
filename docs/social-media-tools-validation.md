# 社媒下载与内容解析：安装及本机验证

验证日期：2026-11-01（Asia/Shanghai）。环境：Intel Mac、Node 22.14.0、隔离 Python 3.12.13。

## 后续修复与当前结果

以下结果更新首次安装时的失败记录。统一视频入口为已修复的 **`video-batch-download`**；social-media-toolkit 保留独立的 CLI / MCP / 云转写路线，不把其结果与这条本地流程混淆。

| 验证项 | 修复后的结果 |
|---|---|
| 抖音视频 | 正常主流程下载 18,511,787 字节、约 71 秒视频，提取音频并使用本地模型输出转写稿 |
| 小红书视频 | 正常主流程下载完整 7,216,290 字节、11.58678 秒、720×1280 视频，提取音频并输出本地转写稿；严格整片解码通过 |
| 本地模型 | tiny 必需文件逐一核验 SHA-256；权重为 75,538,270 字节，SHA-256 为 `dcb76c6586fc06cbdac6dd21f14cfd129cc4cdd9dce19bf4ffa62e59cbe6e6d1`，与原模型一致 |
| 离线运行 | 以 `HF_HUB_OFFLINE=1` 验证本地模型，默认 CPU/int8，无需上传音频或云 ASR |
| 文字质量 | tiny 中文误识别明显，原始稿已保留，不能作为准确逐字稿；解析示例主要依据实际画面、烧录字幕和正文，分别标注来源 |
| 模型选择 | 用户明确选择先保留 tiny，不下载 small；默认命令已改为本地 tiny 路径 |

修复的根因与对应改动：

1. 抖音旧分享页缺少 `videoInfoRes`。官方匿名播放器仍提供视频详情和媒体地址，解析器改为优先使用它；删除等永久错误仍停止。
2. 小红书同一链接在 Node HTTP 客户端返回空笔记页面、Python 返回目标笔记。主流程使用无账号 cookies 的 Python 请求，只接受目标 note ID；失败后才回退匿名浏览器。
3. 完整 CDN 流停滞，256KB Range 请求可正常返回。新增分段下载、重试、Content-Range / 长度 / ETag 校验、分块哈希和断点恢复；完整拼接后才发布最终文件。
4. PyAV 19.0.2 删除了 faster-whisper 1.2.1 使用的参数。约束 `av>=11,<16`，实装 15.1.0。
5. OpenCC 纯 Python 实现自动追加 `.json`，旧配置名产生 `t2s.json.json`。改为 `t2s` 并声明对应依赖。

最新视频、原始转写、抽样画面及解析报告位于 `<repo>/.private/social-media-debug/`。完整流程以正常 CLI、真实媒体校验和模型哈希为证据。

修复后的回归检查：Node 测试 128 项通过，另有 6 项本地 HTTP 分段传输测试通过。测试覆盖错位响应拒绝、传输失败重试、断点恢复、错误哈希拒绝发布，以及目标笔记绑定、官方播放器回退与永久内容错误停止。

## 安装结果

| 项目 | 来源 | 本机状态 |
|---|---|---|
| video-batch-download 4.0.0 | [作者仓库](https://github.com/ljb1020/video-batch-download) | 完整源码、Playwright、FFmpeg、转写依赖已安装；CPU 默认参数已配置 |
| content-reader 技能组 | [作者仓库](https://github.com/Jiaranbb/content-reader) | 总入口及 xhs / bilibili / youtube / twitter 五个 skills 已安装；素材路径已配置 |
| social-media-toolkit 0.4.1 | [作者仓库](https://github.com/risingjerry/social-media-toolkit) | CLI、Python 包及 stdio MCP 已安装；已注册 Cursor、Codex |

技能源码保存在 `labs/`，完整副本安装到 `~/.cursor/skills/`、`~/.agents/skills/`。新增 Codex 元数据、来源记录和本机调用说明；保留上游实现与配套文件。

- Python 环境：`<repo>/.tmp/social-media-runtime/`。
- 默认素材库：`<repo>/.private/social-media-library/`。
- 验证材料：`<repo>/.private/social-media-validation/`，不提交公开仓库。
- 命令入口：`~/.local/bin/` 下的 `socialkit`、`social-media-toolkit-mcp`、`video-batch-download`、`xhs-reader`、`bilibili-reader`、`yt-dlp`、`ffmpeg`、`ffprobe`。
- video-batch-download 默认使用 CPU、int8、已缓存的本地 tiny 模型；默认输出到素材库的 `videos/`。调用者后续参数可覆盖默认值。
- FFmpeg 使用便携 7.1 版本，无需更新旧版 Homebrew；Python 包源下载超时后使用清华 PyPI 镜像安装。依赖版本见 `labs/social-media-toolkit/STUDIO-runtime-versions.json`。

## 首次安装验证结果（修复前历史记录）

这里分别记录安装、联网提取、文件下载与内容理解，不将其中一项成功视为全部成功。

| 能力 | 结果 | 实际证据与边界 |
|---|---|---|
| B站视频下载 | **通过：video-batch-download** | `BV1GJ411x7h7`：下载 24,466,518 字节、212.309 秒 MP4；852×480，H.264 视频轨及 AAC 音轨；已抽帧，严格整片解码通过 |
| B站：content-reader / socialkit 直接 HTTP 路径 | **未通过本轮联网测试** | 同一作品访问 `www.bilibili.com` 超时；不影响上述浏览器下载路径已通过的事实 |
| 小红书图文下载 | **通过：socialkit** | 笔记 `6a8bb141000000000302aafd`：提取 915 字符正文，下载 9 张图片与封面；10 个文件全部通过字节数和 SHA-256 核对 |
| 小红书视频元数据解析 | **通过：socialkit / 匿名浏览器** | 已识别公开视频；短视频样例 `6a74033a000000003203163d` 识别为视频，返回 11 秒时长与媒体地址 |
| 小红书视频完整下载 | **未通过** | 长视频传输超过 180 秒，短视频传输也不完整；虽然能读出时长、轨道，严格解码仍报损坏，不能交付为完整视频 |
| content-reader 小红书直接 HTTP 提取 | **未通过本轮联网测试** | 两条公开笔记返回 `No noteDetailMap found in state`；浏览器兜底也出现超时 |
| content-reader 小红书状态解析器 | **单独通过** | 使用已真实取得的 socialkit bundle 映射到状态契约，解析出正文、标签和 9 张图片；这不是该工具独立抓取成功 |
| 抖音视频下载、解析 | **未通过** | 样例 `7672353829669447867`：桌面页及官方移动分享页分别访问超时；socialkit 公共解析器未能解析视频/图集 JSON |
| 抖音图文 | **未验证** | 尚无可访问的真实图文样例；不能以封面下载代替图文验证 |
| B站图文 / 专栏 / 动态 | **这套选型未覆盖** | 当前选中的 B站工具围绕视频、分 P、字幕；未验证图文采集，不宣称支持 |
| 本地语音转写 | **依赖就绪，端到端未通过** | faster-whisper 及 FFmpeg 可导入、运行；Whisper tiny 公开模型下载多次超时，保留断点缓存，未产出已验证逐字稿 |
| 图文内容解析 | **通过一个真实样例** | 已基于提取正文及实际下载图片生成结构分析，见私有验证目录 `content-analysis.md` |
| 视频画面解析 | **通过抽样验证** | 基于真实 B站视频抽取联系表并检查画面；不等同于完整逐帧分镜或语音全文解析 |

## MCP 与本地检查

- 实际执行 stdio `initialize`、`list_tools` 和 `social_doctor`，发现六个工具：`social_inspect`、`social_get_text`、`social_get_comments`、`social_download`、`social_capture_bundle`、`social_doctor`。
- video-batch-download 上游测试：121 项通过；social-media-toolkit 上游测试：71 项通过。单元测试不能证明真实平台联网成功。
- xhs-reader doctor：Python、curl、yt-dlp、FFmpeg、faster-whisper 均可用；small / medium 模型尚未缓存。
- socialkit doctor 的 `partial` 源于 GetNote、TikHub、火山引擎 ASR 等可选能力未配置；FFmpeg 与 yt-dlp 已检测到。
- 本轮未使用用户平台登录态，未配置新的付费服务或产生付费 ASR 调用。

## 调用方法

在支持对应技能的下一轮对话中：

```text
$video-batch-download 下载这个 B站视频，只下载原视频：<链接>
$content-reader 保存这个小红书图文，下载图片并解析内容结构：<链接>
$social-media-toolkit 提取这个公开链接的正文、图片和视频信息：<链接>
```

终端可直接调用：

```bash
video-batch-download '<链接>' --no-transcribe
socialkit inspect '<链接>'
socialkit capture '<链接>' --no-text --output '<绝对保存目录>'
socialkit doctor
xhs-reader --doctor
```

`socialkit text` 及未加 `--no-text` 的 capture 会走文字提取路由；视频缺少平台字幕时，需要配置相应云 ASR 才能在第 3 项内部继续。第 3 项自身不支持本地 ASR 或图片 OCR。本地转写应使用第 1 项或其他已安装视频处理能力，并先完成模型下载。

## 首次验证结论（已由上方后续修复更新）

三个项目已安装并完成本机基础配置，不能宣称三平台的全部媒体类型均已可用。当前可靠通过的样例是 **B站视频下载与抽帧、小红书图文提取下载和结构解析、MCP 服务连接**。抖音、完整小红书视频下载、本地 ASR 和未覆盖的图文类型仍需后续处理。
