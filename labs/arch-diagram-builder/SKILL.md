---
name: arch-diagram-builder
description: 用单文件 HTML 生成交互式、分步动画的系统架构图（动态架构图 / architecture diagram）。当用户要求"画架构图、动态架构图、交互式架构图、系统架构演示、数据流图、runtime 流程图、把架构做成可演示 HTML"时使用。与 ppt-builder 并列：幻灯片讲观点，本 Skill 讲系统结构与数据流。
---

# Interactive Architecture Diagram Builder

你是系统架构可视化专家 + 前端工程师。产出**单文件 HTML**，浏览器全屏展示，零外部依赖。

## 工作流（必须按顺序）

1. **确认主题与听众**：图表主题、核心 runtime 流程（2–3 句）、节点数量规模、演示步数（6–9 步）。关键信息缺失先问；用户说「直接出」才跳过。
2. **读设计系统**：生成前必读 [`references/design-system.md`](references/design-system.md)（固定规范，不得擅自改 Token / 组件语义）。
3. **填内容描述**：按 [`references/content-template.md`](references/content-template.md) 整理节点、连线、Chip、步骤。可参考 [`references/examples/agent-dev-system.md`](references/examples/agent-dev-system.md)。
4. **布局与布线**：画 SVG 前规划锚点；双向连线必读 [`references/path-routing.md`](references/path-routing.md)，**禁止两条 path 共用同一路径**。
5. **生成单文件 HTML**：CSS + SVG + JS 全内联。保存路径：
   - 默认可放映全屏图 → `docs/diagrams/{主题英文短名}.html`
   - 用户指定路径时从其指定
6. **验收与预览**：生成后**立即用 Chrome 打开**（macOS：`open -a "Google Chrome" /absolute/path/to/file.html`）。再提示用户步进操作（→/Space、R 重置）。若配合 cognition 文章，提醒 frontmatter `diagram` 字段。
7. **Harness 回归**（改 Skill 或交付前）：`node scripts/verify-diagram.mjs docs/diagrams/xxx.html` 须 exit 0。详见 [`references/harness-engineering.md`](references/harness-engineering.md)。

## 内容铁律

- **一步一动作**：每步只激活该步相关的 nodes / conns / chips / particles，不要一次全亮。
- **顺序必须在图上可见**：涉及先后次序、阶段、流水线时，必须加 flow-strip、节点 order-badge、连线 conn-order、导航步骤号；不能只在文稿里写顺序。
- **五色语义不可混用**：蓝入口与响应 / 紫 LLM 与 Agent / 绿存储与记忆 / 橙工具与外部调用 / 青监控与评估。
- **连线必须用 `<path>`**：禁止 `<line>`，粒子动画依赖 path id。
- **粒子与 path 一一对应**：每条激活连线配 `p-{key}` + `pg-{key}` 双 circle + `animateMotion` + `mpath`。
- **绝不编造架构**：不确定的组件用 [TODO] 占位，不杜撰商业产品内部细节。
- **屏上无仓库路径**：图内标题写主题名，不出现 `labs/`、`cognition/` 等路径。

## 技术要点速查

| 项目 | 要求 |
|------|------|
| 页面 | 100vw×100vh 白底 `#FFFFFF`，顶栏 56px，底栏 88px |
| viewBox | 900–960 × 480–540 |
| 节点 | `rect rx=12`，默认白底 + `#B0B8C8` 描边，激活态 10% 色填充 + 2.5 描边 |
| 分区 | `rect rx=16` 虚线框，9.5px uppercase 标签 |
| 连线 | `stroke-width 2.5`，`stroke-dasharray 8 5`，默认 opacity 0.3，激活 `.fwd` / `.bwd` |
| 步进 | `STEPS[]` 含 `html, nodes, conns, labels, chips, particles` |
| 键盘 | →/Space 下一步，← 上一步，R 重置 |

完整 CSS Token、marker、粒子参数见 `references/design-system.md`。

## 双平台调用

| 平台 | 调用 |
|------|------|
| Claude Code / Cursor | `/arch-diagram-builder` 或对话触发 |
| Codex | `$arch-diagram-builder` + 主题与节点描述 |

用户提问用对话列出结构化问题（Codex 无 AskUserQuestion）。

## 与 ppt-builder 分工

- **ppt-builder**：多页幻灯片、观点叙事、Google I/O 风格 keynote
- **arch-diagram-builder**：单页、步进、runtime 数据流、系统架构演示

同一主题可各出一份 HTML，互不替代。

## 延伸阅读

- [design-system.md](references/design-system.md) — 完整设计规范
- [content-template.md](references/content-template.md) — 可变内容填写模板
- [path-routing.md](references/path-routing.md) — 双向连线避堆叠
- [examples/agent-dev-system.md](references/examples/agent-dev-system.md) — Agent 开发系统范例
- [harness-engineering.md](references/harness-engineering.md) — 离线验证与 eval 迭代
- 成品参考：`docs/diagrams/ai-agent-dev-system.html`
- 验证脚本：`scripts/verify-diagram.mjs`
