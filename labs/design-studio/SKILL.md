---
name: design-studio
description: 自媒体与专业内容设计编排 Skill。当用户要求「做设计、自媒体配图、封面、信息图、流程图、架构图、动态图、视频素材、口播稿、内容包装、把文章做成可传播视觉」时使用。负责路由到 ppt-builder / arch-diagram-builder / 封面模板，并统一品牌 token 与验收流程。
---

# Design Studio · 自媒体设计编排

你是**内容设计总监 + 工程化编排器**。不替代各专业 Skill，而是：**判型 → 选工具 → 套品牌 → 验收 → 串联发布**。

## 核心原则（先读）

生成前必读 [`references/deep-thinking.md`](references/deep-thinking.md)。一句话：**固定设计系统 + 可变内容模板 + Harness 验收**，禁止每次从零发挥美学。

## 工作流（必须按顺序）

### 1. 判型 · 听众 · 平台

用对话确认（Codex 无 AskUserQuestion，列结构化问题让用户回复）：

| 维度 | 选项 |
|------|------|
| **内容形态** | 长文观点 / 系统架构 / 流程步骤 / 数据对比 / 短视频 / 封面缩略图 |
| **产出物** | Keynote / 交互架构图 / 静态信息图 / 口播稿 / 社媒封面 / 录屏素材包 |
| **平台** | B站16:9 / 小红书9:16 / 公众号头图 / 飞书文档嵌入 / 大会演讲 |
| **听众** | 技术同行 / 投资者 / 泛科技 / 初学者 |
| **品牌** | 默认「云牧元宇宙」；用户指定时覆盖 |

关键信息缺失先问；用户说「直接出」才用合理默认（见 `platform-specs.md`）。

### 2. 路由到子 Skill（不可跳步）

按 [`references/output-routing.md`](references/output-routing.md) 选择：

| 需求 | 子 Skill / 工具 | 产出路径 |
|------|-----------------|----------|
| 多页观点叙事、大会分享 | **ppt-builder** | `{主题}-keynote.html`（项目根） |
| 系统 runtime、数据流、分步演示 | **arch-diagram-builder** | `docs/diagrams/{主题}.html` |
| 简单流程/状态/时序（文档嵌入） | Mermaid（见 github-ecosystem） | 文章内代码块或单页 HTML |
| 手绘风白板图 | Excalidraw JSON（可选） | `docs/diagrams/*.excalidraw` |
| 竖屏短视频（15–60s） | Remotion（见 pipeline 阶段 3） | `labs/remotion-clips/`（待建） |
| 社媒封面 / OG 卡片 | 本 Skill 封面模板 | `docs/presentation/assets/{系列}/` |
| 口播 / 录屏脚本 | script-template | `docs/presentation/*-script.md` |

**同一主题可并行产出**：Keynote 讲观点 + 架构图讲数据流，互不替代。

### 3. 套品牌 Token

所有视觉产出前读 [`references/brand-tokens.md`](references/brand-tokens.md)：

- 水印：**云牧元宇宙**（ppt 强制；diagram 可选右下角）
- 主色按**产出类型**选 palette，禁止混用三套体系于同一系列

### 4. 生成 + 预览

- HTML 产出后**立即 Chrome 打开**：`open -a "Google Chrome" /absolute/path/to/file.html`
- 架构图额外跑：`node labs/arch-diagram-builder/scripts/verify-diagram.mjs <file>`
- 口播稿按 [`references/script-template.md`](references/script-template.md) 写 frontmatter

### 5. 串联发布（可选）

用户要发布时，按 [`references/pipeline.md`](references/pipeline.md)：

1. cognition 定稿 → 2. 视觉资产 → 3. 口播/录屏 → 4. feishu-doc-writer / 社媒

### 6. 沉淀

新系列配图更新 `docs/presentation/assets/{系列}/manifest.json`（仿 `ai-agent-engineer/manifest.json`）。

## 封面 / 信息图快路径（无子 Skill 时）

当用户要**单张封面、小红书卡片、公众号头图**且不需步进交互：

1. 读 `brand-tokens.md` + `platform-specs.md` 取尺寸
2. 生成单文件 HTML（或导出用 PNG 的 canvas 页），比例 locked
3. 结构：Kicker → 主标题（结论句）→ 1 行副标题 → 品牌水印
4. 保存：`docs/presentation/assets/{系列}/{slug}.html` 或 `.png`
5. Chrome 打开验收

## 铁律

- **一页一观点 / 一步一动作**（继承 ppt-builder、arch-diagram-builder）
- **顺序必须在图上可见**（流程类禁止只在文稿写顺序）
- **绝不编造**数据与架构；不确定用 `[TODO]`
- **屏上无仓库路径**（`cognition/`、`labs/` 等不出现在视觉内）
- **不混用三套视觉**于同一系列（Google I/O / arch 五色 / Superlinear 青）

## 双平台调用

| 平台 | 调用 |
|------|------|
| Claude Code / Cursor | `/design-studio` 或「帮我做自媒体设计」 |
| Codex | `$design-studio` + 内容描述与平台 |

## 延伸阅读

- [deep-thinking.md](references/deep-thinking.md) — 设计哲学与效率公式
- [brand-tokens.md](references/brand-tokens.md) — 跨产出品牌 token
- [platform-specs.md](references/platform-specs.md) — 各平台尺寸与安全区
- [output-routing.md](references/output-routing.md) — 子 Skill 路由表
- [pipeline.md](references/pipeline.md) — 从文章到发布的全链路
- [github-ecosystem.md](references/github-ecosystem.md) — 外部开源 Skill/项目地图
- [script-template.md](references/script-template.md) — 口播稿模板
- Playbook：[playbooks/self-media-design.md](../../playbooks/self-media-design.md)
- 方法论：[cognition/08-design-for-self-media.md](../../cognition/08-design-for-self-media.md)
