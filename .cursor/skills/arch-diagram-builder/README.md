---
title: arch-diagram-builder · 交互式架构图 Skill
date: 2026-06-21
status: stable
audience: [self, dev]
tags: [skill, diagram, architecture, agent, visualization]
summary: 单文件 HTML 分步动画架构图：固定设计系统 + 可变内容，五色语义、粒子流动、键盘步进。
---

# arch-diagram-builder

用单文件 HTML 生成交互式、可步进演示的系统架构图。与 `ppt-builder` 并列：**幻灯片讲观点，架构图讲 runtime 数据流**。

## TL;DR

```text
画一个 RAG Pipeline 的动态架构图
$arch-diagram-builder RAG Pipeline：Retriever → Vector DB → LLM
```

产出：`docs/diagrams/{name}.html`，浏览器 `open` 即可全屏演示。

## 安装（三端同步）

```bash
cd ~/github/ai-cognition-studio
./scripts/sync-skill.sh arch-diagram-builder
```

| 端 | 路径 |
|----|------|
| 源码 | `labs/arch-diagram-builder/` |
| Cursor | `~/.cursor/skills/arch-diagram-builder/` |
| Codex | `~/.agents/skills/arch-diagram-builder/` |

项目级（可选）：`.cursor/skills/arch-diagram-builder/`

## 调用

| 平台 | 方式 |
|------|------|
| Cursor | 「画架构图」「动态架构图」或 `@arch-diagram-builder` |
| Codex | `$arch-diagram-builder` + 描述 |

## 目录

```
references/
├── design-system.md      # 固定技术规范（每次不变）
├── content-template.md   # 可变内容填写模板
├── path-routing.md       # 双向连线分车道规则
└── examples/
    └── agent-dev-system.md
```

## 成品示例

- HTML：`docs/diagrams/ai-agent-dev-system.html`
- 文章：`cognition/03-interactive-arch-diagram.md`

## 挂到 Studio 文章

```yaml
diagram:
  src: diagrams/your-diagram.html
  title: 图表标题
  height: 600
```

## Harness 回归

```bash
node labs/arch-diagram-builder/scripts/verify-diagram.mjs docs/diagrams/ai-agent-dev-system.html
```

Eval 用例：`evals/evals.json` · 迭代方法：`references/harness-engineering.md`

## 验收（Skill 加载）

1. `./scripts/sync-skill.sh arch-diagram-builder` 无报错
2. Cursor 新对话：「用 arch-diagram-builder 画一个最简单的两节点 demo」
3. Codex：`$arch-diagram-builder` 能启动
