---
title: 交互式架构图：用单文件 HTML 讲清 AI 系统
date: 2026-06-21
status: stable
audience: [self, dev, general]
tags: [cognition, agent, architect, diagram, skill, visualization]
summary: 固定设计系统 + 可变内容描述 → 分步动画架构图；附 AI Agent 开发系统完整示例与 arch-diagram-builder Skill。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 7
  week: 2026-W25
  slot: handbook
diagram:
  src: diagrams/ai-agent-dev-system.html
  title: AI Agent 开发系统架构 · 分步演示
  height: 600
---

# 交互式架构图：用单文件 HTML 讲清 AI 系统

> **TL;DR**：技术架构不适合塞进 PPT 一页静态框图。用**固定设计系统 + 可变内容描述**生成分步动画单文件 HTML——节点高亮、连线流动、粒子轨迹、键盘步进——比截图或 Mermaid 更适合讲 **runtime 数据流**。

---

## 1 · 为什么需要另一种图

静态架构图（框 + 箭头）适合**总览**，但讲 Agent / RAG / Workflow 时听众真正需要的是：

| 静态图的问题 | 交互图补上什么 |
|-------------|----------------|
| 所有组件同时亮着，不知道当前讲哪一步 | 每步只激活相关节点与连线 |
| 双向箭头叠在一起 | 分车道曲线路径，去程 / 回程分离 |
| 数据流向靠口头描述 | 虚线流动动画 + 粒子沿 path 运动 |
| 组件内部能力看不见 | Chip 标签（RAG、Plan、Trace…）按步高亮 |

本仓库已有 [`docs/diagrams/ai-product-six-layers.html`](../../docs/diagrams/ai-product-six-layers.html) 做**六层总览**；本文方法做**单主题 runtime 流程演示**，二者互补。

---

## 2 · 方法：两层 Prompt

### 固定层（设计系统，每次不变）

技术规范包括：

- 页面 100vw × 100vh 白底，56px 顶栏 + 88px 底栏步进控制
- SVG 主图区（建议 viewBox 900–960 × 480–540）
- **五色语义**：蓝入口 / 紫智能 / 绿数据 / 橙执行 / 青可观测
- 节点 `<rect rx=12>`、分区虚线框、连线 `<path>` + 粒子 `<animateMotion>`
- 步骤对象：`html`、`nodes`、`conns`、`labels`、`chips`、`particles`

完整规范见 Skill 内 [`references/design-system.md`](../../labs/arch-diagram-builder/references/design-system.md)。

### 可变层（每次只填）

填主题、节点表、连接关系、Chip、6–9 个演示步骤即可。模板见 [`references/content-template.md`](../../labs/arch-diagram-builder/references/content-template.md)。

---

## 3 · 示例：AI Agent 开发系统

### 架构一句话

用户请求经 API 进入 **Agent Runtime** 的 Plan-Act-Observe 循环；Runtime 拉取 **Context**、调用 **LLM** 推理、经 **Tool Router** 执行 MCP/API，**Memory** 持久化状态，**Observability** 全链路采集，最终响应返回用户。

### 节点与颜色

| 节点 | 语义 | 颜色 |
|------|------|------|
| 用户 / App、API Gateway、响应输出 | 对外接口 | 蓝 |
| Agent Runtime、LLM Provider | 推理与控制 | 紫 |
| Context Engine、Memory Store | 上下文与记忆 | 绿 |
| Tool Router、MCP / APIs | 工具执行 | 橙 |
| Observability | Trace / Eval / Log | 青 |

### 八步演示叙事

1. 用户请求 → API Gateway
2. API 路由至 Agent Runtime
3. Context Engine 注入 RAG / Profile / Workspace
4. LLM 推理（Plan 阶段）
5. Tool Router 调用 MCP / API（Act）
6. 执行结果回流（Observe）
7. Memory 持久化 + Observability 采集
8. 生成响应返回用户

### 连线避坑（双向不堆叠）

双向关系必须**分车道**：例如 Runtime ↔ LLM 用上轨 y=200 / 下轨 y=252；Runtime ↔ Tools 去程走左弧、回程走右弧。详见 [`path-routing.md`](../../labs/arch-diagram-builder/references/path-routing.md)。

---

## 4 · 打开示例图

| 方式 | 链接 |
|------|------|
| **Studio 文章内嵌** | 启动 Studio 后打开本文（见下方命令） |
| **全屏交互** | `docs/diagrams/ai-agent-dev-system.html` 用浏览器直接打开 |
| **本地命令** | `open docs/diagrams/ai-agent-dev-system.html` |

交互：→ / Space 下一步，← 上一步，R 重置。

---

## 5 · 沉淀为全局 Skill

已安装 **`arch-diagram-builder`**（与 `ppt-builder` 并列）：

| 平台 | 调用方式 |
|------|----------|
| **Cursor** | 对话中说「画架构图 / 动态架构图 / 交互式架构图」，或 `@arch-diagram-builder` |
| **Codex** | `$arch-diagram-builder` + 主题描述 |

源码：`labs/arch-diagram-builder/` · 同步命令：

```bash
cd ~/github/ai-cognition-studio && ./scripts/sync-skill.sh arch-diagram-builder
```

### 与 ppt-builder 的分工

| Skill | 产出 | 适用场景 |
|-------|------|----------|
| `ppt-builder` | 翻页幻灯片 HTML | 大会分享、观点叙事、金句 |
| `arch-diagram-builder` | 单页步进架构图 HTML | 系统结构、数据流、runtime 演示 |

一篇文章可以同时有 Keynote（观点）+ 架构图（结构）两个 HTML 产物。

---

## 6 · 挂到 cognition 文档

Markdown frontmatter 加 `diagram` 字段，Studio 会自动嵌入并可全屏打开：

```yaml
diagram:
  src: diagrams/your-diagram.html
  title: 图表标题
  height: 600
```

HTML 文件放 `docs/diagrams/`，构建时复制到 Studio 静态资源。

---

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-21 | v0.1：方法论 + Agent 开发系统示例 + arch-diagram-builder Skill |
