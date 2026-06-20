---
title: AI 产品的六个层次 v0.1
date: 2026-06-20
status: stable
audience: [self, dev, general]
tags: [cognition, ai-product, agent, workflow, rag, architect]
summary: 区分 AI-assisted building 与 AI runtime；AI 应用六层成熟度 + 人的能力 L3–L6；附可交互架构图。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 6
  week: 2026-W24
  slot: pillar
diagram:
  src: diagrams/ai-product-six-layers.html
  title: AI 产品六层架构 · 完整总览
  height: 1280
source:
  title: AI产品的六个层次
  url: https://www.superlinear.academy/c/ai-resources/ai-product
  author: Superlinear Academy
---

# AI 产品的六个层次 v0.1

> **TL;DR**：会用 AI 写代码 ≠ 会做 AI 系统。关键看 **用户使用时 AI 是否参与 runtime**。AI 应用可分六层（Wrapper → RAG → Tools → Workflow → Agent → AI-native）；人的能力对应 L3 Consumer → L6 Architect。

**来源笔记**：[Superlinear Academy · AI产品的六个层次](https://www.superlinear.academy/c/ai-resources/ai-product)（下文为结构化摘要 + 本仓库实践对照）

---

## 0 · 先区分两件事

| | AI-assisted Building | AI Runtime（AI Product） |
|--|----------------------|---------------------------|
| **何时** | 开发过程中 | 用户使用产品时 |
| **AI 做什么** | 帮你写代码 | 读上下文、调工具、判断、执行、记忆 |
| **例子** | Cursor 写的普通日历 App | 邮件助手：读信 → 生成回复 → 调 Gmail → 等人确认 → 发送 |

判断标准：**不看开发时有没有用 AI，而看 runtime 里 AI 是否承担任务执行的一部分。**

---

## I · AI 应用六层（成熟度递增）

下方 **交互式架构图** 汇总六层数据流、技术标签、L6 模块与人的能力 L3–L6 映射（文章顶部已嵌入，可滚动查看；亦可点击「新窗口全屏打开」）。

| 层 | 名称 | 本质 | 典型产物 |
|----|------|------|----------|
| **L1** | Prompt Wrapper | Model as a feature | 标题/邮件/简历生成器 |
| **L2** | Grounded AI / RAG | 知道更多，仍主要回答 | 知识库助手、FAQ、课程助教 |
| **L3** | Tool-using AI | Model as interface to tools | 查日历、读邮件、更新 CRM |
| **L4** | LLM Workflow | AI inside controlled process | 退款审核、合同初审、bug triage |
| **L5** | Agentic Core | Model as controller | Plan → Act → Observe 循环 |
| **L6** | AI-native System | AI 是系统智能层 | 带 memory / eval / 主动触发的 OS |

### L1 · Prompt Wrapper

```
用户输入 → prompt template → LLM → 输出
```

无真实上下文、无工具、无状态。半小时可被 replicate。**对应人的 L4 早期 demo。**

### L2 · Grounded AI / RAG

```
问题 → 检索 KB/DB → rerank → 拼接上下文 → LLM → citation
```

重点在 chunking、hybrid search、permission-aware retrieval，不是「写一个好 prompt」。

### L3 · Tool-using AI

```
目标 → LLM 选工具 → function call → 结果 → 继续
```

有「手脚」，但可能只是一次性调用，无循环规划。

### L4 · LLM Workflow

```
分类 → 检索 → 抽取 → 调 API → 生成 → 人工确认 → 执行 → 日志/eval
```

Anthropic 所称 **Workflow**：路径明确、可预测。**L5 Builder 的主战场。**

### L5 · Agentic Core

```
Goal → Plan → Choose tool → Act → Observe → Update state → Continue/Stop/Ask human
```

OpenAI / Google 所称 **Agent**：模型控制执行循环。需要 guardrails、eval、tracing、human handoff。

### L6 · AI-native Product / System

Agentic Core + 真实产品场景，三类能力：

| 产品能力 | 技术模块 |
|----------|----------|
| **低摩擦交互** | inline edit、sidebar、approval UI、HITL |
| **上下文智能** | profile、workspace、RAG、long-term memory、权限过滤 |
| **主动智能** | cron、webhook、event trigger、agent runner |

**L6 Architect 的完整形态** — Building what you can't buy。

---

## II · 人的能力四档 L3 → L6

| 层级 | 关键词 | 你在做什么 | AI 角色 |
|------|--------|------------|---------|
| **L3** Consumer | Chatting | 问 AI、用答案 | 咨询师 |
| **L4** Tinkerer | One-off | AI coding 做 demo | 外包 |
| **L5** Builder | Reliability | 构建可靠 workflow | 逻辑引擎 |
| **L6** Architect | Orchestration | 设计 AI 系统架构 | 系统控制层 |

更锋利地说：

- **L3**：我会问 AI。
- **L4**：我会让 AI 帮我做一个东西。
- **L5**：我会把 AI 放进一个可靠流程。
- **L6**：我会设计一个 AI 驱动的系统。

### L5 的三项硬功夫

1. **Context Engineering** — 让模型在正确时间看到正确信息，context window 是工作台不是垃圾桶。
2. **Evaluation** — 定义质量标准（分类准确率、误批率、结构稳定性），没有 eval 就没有可靠性。
3. **Iterative Mindset** — 持续迭代 prompt、workflow、retrieval、tool schema、HITL 节点。

### L6 的三项架构能力

1. **System Resilience** — retry、fallback、structured output、human escalation、observability。
2. **Contextual Architecture** — working / long-term / transactional memory。
3. **Orchestration & Integration** — 何时 workflow、何时 agent、何时 multi-agent、何时交给人。

---

## III · 10 问：你的项目在哪一层？

1. AI 只在开发时参与？→ **Building，非 AI 产品**
2. 用户使用时 AI 参与？→ 进入 **AI product**
3. 一次性生成文本？→ **L1 Wrapper**
4. 接入外部知识？→ **L2 RAG**
5. 能调用工具/API？→ **L3 Tool-using**
6. 嵌入稳定业务流程？→ **L4 Workflow**
7. 决定下一步、循环执行？→ **L5 Agentic**
8. 有 memory / permission / eval / runtime？→ 接近 **L6**
9. 能主动触发？→ **Proactive intelligence**
10. 成为工作系统一部分？→ **L6 Architect 目标**

---

## IV · 与本仓库的对照

| 本仓库模块 | 大致层级 | 说明 |
|------------|----------|------|
| [00 认知地图](00-ai-cognition-map.md) | L4–L5 框架 | 副驾模型 + Context 三层 |
| [01 国产模型接入](01-domestic-llm-integration.md) | L2–L3 | 模型选型 + API 集成 |
| [Skill 三端同步](../playbooks/skill-dual-install.md) | L4 Workflow | 可控流程 + checklist |
| [inspiration-curator](../agents/inspiration-curator/) | L3–L5 | Tool + Agent loop demo |
| [Studio 导航](../studio/) | L6 雏形 | 内容索引 + 连载主线 + 权限预留 |
| **本文 + 架构图** | L1–L6 索引 | 判断框架与可视化 |

学习路径建议（与 [learning-roadmap.md](../meta/learning-roadmap.md) 对齐）：

```
L3 高质量用模型 → L4 AI coding 原型 → L5 workflow/eval/RAG → L6 orchestration/memory/runtime
```

---

## 延伸阅读

- [AI 认知地图 v0.1](00-ai-cognition-map.md)
- [内容更新主线](../meta/publishing-line.md)
- [Agent 编写 Checklist](../playbooks/agent-authoring-checklist.md)
- 原文：[Superlinear Academy](https://www.superlinear.academy/c/ai-resources/ai-product)

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-20 | v0.1：摘要 + 架构图入库 |
