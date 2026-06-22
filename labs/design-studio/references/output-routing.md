# 产出路由表

`design-studio` 只做编排；具体生成委托子 Skill 或工具。

## 主路由

| 用户意图 | 路由目标 | 触发语 | 产出 |
|----------|----------|--------|------|
| 做 PPT / Keynote / 幻灯片 | `ppt-builder` | 「做 keynote」「把文章做成 PPT」 | `{主题}-keynote.html` |
| 画架构图 / 动态图 / 数据流 | `arch-diagram-builder` | 「画架构图」「交互式演示」 | `docs/diagrams/{主题}.html` |
| 全流程包装（不确定形态） | `design-studio` 本 Skill | 「自媒体设计」「内容包装」 | 多产物 + manifest |
| 写口播 / 录屏稿 | `script-template` | 「写口播稿」「讲解稿」 | `docs/presentation/*-script.md` |
| 发飞书 | `feishu-doc-writer` | 「发飞书」「同步 Wiki」 | 飞书子文档 URL |
| 分析参考视频 | `social-video-toolkit` | 「下载视频」「提取字幕」 | 本地素材 + 分析 |

## 形态细分

### 观点叙事（多页）

→ **ppt-builder**

- 适用：框架、对比、金句、Takeaway、大会演讲
- 不适用：runtime 步进、节点连线动画

### 系统结构（单页步进）

→ **arch-diagram-builder**

- 适用：Agent 链路、产业链、投资逻辑、8 步演示
- 不适用：15 页观点展开

### 文档内轻量图

→ **Mermaid**（无需独立 HTML）

- flowchart / sequence / state / gantt
- 嵌入 cognition Markdown；Studio 可渲染
- 复杂交互仍用 arch-diagram HTML

### 手绘白板风

→ **Excalidraw**（社区 Skill，见 github-ecosystem）

- 适用：讨论稿、非正式分享、头脑风暴
- 带 Playwright 自检的社区实现可 PNG 回归

### 竖屏短视频

→ **Remotion**（见 pipeline 阶段 3，待建 `labs/remotion-clips`）

- 适用：产品 Demo、数据动画、字幕短视频
- 安装：`npx skills add remotion-dev/skills`

### 封面 / 卡片 / OG

→ **design-studio 封面快路径**

- 单文件 HTML → Chrome 截图
- 或 `docs/presentation/assets/{系列}/`

## 组合套餐（常见自媒体套装）

| 套餐 | 产物 | Skills |
|------|------|--------|
| **技术分享** | Keynote + 架构图 + 口播稿 | ppt-builder + arch-diagram + script |
| **投资深度** | 4 张交互图 + 4 篇文章 + 索引页 + 口播 | arch-diagram ×4 + cognition + script |
| **短视频切片** | 9:16 竖屏 + 封面 + 标题文案 | Remotion + 封面快路径 |
| **飞书专栏** | 长文 + 嵌入图 + OG | feishu-doc-writer + diagram |

## 决策问句（Agent 自检）

1. 观众需要**翻页**还是**步进**？→ 翻页=ppt，步进=arch-diagram
2. 核心是**观点**还是**结构**？→ 观点=ppt，结构=diagram
3. 要**录屏**还是**打印/PDF**？→ 录屏=白底 HTML 全屏
4. 要**竖屏**吗？→ 是=改比例或 Remotion
5. 同一系列是否已有 palette？→ 查 `brand-tokens.md` 系列表
