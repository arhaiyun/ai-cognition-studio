---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section {
    background: #0b0f14;
    color: #e8edf4;
    font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    padding: 48px 56px;
  }
  h1 { color: #e8edf4; font-size: 1.75em; }
  h2 { color: #5b9cf5; font-size: 1.35em; border-bottom: 2px solid #2a3544; padding-bottom: 8px; }
  h3 { color: #34d399; font-size: 1.1em; }
  strong { color: #f59e0b; }
  table { font-size: 0.72em; width: 100%; border-collapse: collapse; }
  th { background: #1a2230; color: #5b9cf5; padding: 8px; border: 1px solid #2a3544; }
  td { padding: 8px; border: 1px solid #2a3544; vertical-align: top; }
  code { background: #1a2230; color: #34d399; font-size: 0.85em; }
  blockquote { border-left: 4px solid #5b9cf5; padding-left: 16px; color: #8b9cb3; }
  section.lead h1 { font-size: 2em; }
  section.lead p { color: #8b9cb3; }
  .small { font-size: 0.65em; color: #8b9cb3; }
  ul { line-height: 1.6; }
  section.title-slide { text-align: center; }
  section.title-slide h1 { margin-top: 80px; }
---

<!-- _class: lead title-slide -->

# 会用 AI 写代码
# ≠ 会做 AI 产品

**AI 应用六层框架 · 人的能力 L3–L6**

AI Cognition Studio · 连载 #6  
arhaiyun · 2026

---

## 今天讲什么

1. **Building vs Runtime** — 什么才算 AI 产品
2. **AI 应用六层** — L1 → L6 成熟度地图
3. **人的能力四档** — L3 Consumer → L6 Architect
4. **自检框架** — 你的项目在哪一层
5. **下一步** — 学习路径与资源

> 参考：Superlinear Academy · [AI产品的六个层次](https://www.superlinear.academy/c/ai-resources/ai-product)

---

<!-- _class: lead -->

# 一个常见误会

用 Cursor / Claude Code 做出了网页、插件、小工具

↓

**「我已经会做 AI 产品了」**

---

## 先区分两件事

| | **AI-assisted Building** | **AI Runtime（AI Product）** |
|--|--------------------------|------------------------------|
| **何时** | 开发过程中 | **用户使用产品时** |
| **AI 做什么** | 帮你写代码 | 读上下文 · 调工具 · 判断 · 执行 · 记忆 |
| **例子** | Cursor 写的普通日历 App | 邮件助手：读信 → 生成 → 调 API → 确认 → 发送 |

### 判断标准

**不看开发时有没有用 AI**  
**而看 runtime 里 AI 是否承担任务执行的一部分**

---

## AI 应用六层 · 总览

| 层 | 名称 | 本质 |
|:--:|------|------|
| **L1** | Prompt Wrapper | Model as a **feature** |
| **L2** | Grounded AI / RAG | 知道更多，仍主要**回答** |
| **L3** | Tool-using AI | Model as **interface to tools** |
| **L4** | LLM Workflow | AI inside **controlled process** |
| **L5** | Agentic Core | Model as **controller** |
| **L6** | AI-native System | AI 是系统的**智能层** |

自下而上 · 成熟度递增

---

## L1 · Prompt Wrapper

### 结构
`用户输入 → prompt template → LLM → 输出`

### 典型产物
标题生成 · 邮件润色 · 简历优化 · 简单聊天机器人

### 局限
无上下文 · 无工具 · 无状态 · 易被 replicate

**本质：模型当功能**

---

## L2 · Grounded AI / RAG

### 结构
`问题 → 检索 KB/DB → rerank → 拼接上下文 → LLM → citation`

### 典型产物
知识库问答 · 客服 FAQ · 课程助教 · 内部 SOP

### 技术重点
chunking · hybrid search · 权限检索 · 引用 · 降幻觉

**本质：知道更多，但仍主要是回答**

---

## L3 · Tool-using AI

### 结构
`目标 → LLM 选工具 → function call → 结果 → 继续`

### 典型产物
查日历 · 读 Gmail · 更新 CRM · 生成文件 · 跑代码

### 技术重点
tool schema · auth · 参数校验 · 执行前确认 · 错误处理

**本质：模型是工具和系统的自然语言入口 — 长「手脚」了**

---

## L4 · LLM Workflow

### 结构
`分类 → 检索 → 抽取 → 调 API → 生成 → 人工确认 → 执行 → eval`

### 典型产物
退款审核 · 合同初审 · 候选人筛选 · bug triage · 舆情日报

### 为何重要
路径明确 · 可预测 · 知道哪步必须人审

**Anthropic：Workflow — L5 Builder 的主战场**

---

## L5 · Agentic Core

### 循环
`Goal → Plan → Act → Observe → Update → Continue / Stop / Ask human`

### 组件
planner · tool registry · memory · RAG · guardrails · eval · tracing · HITL

### 行业定义
OpenAI / Google：**Agent** — 模型**控制任务执行**

**本质：Model as a controller**

---

## L6 · AI-native System

Agentic Core + 真实产品场景

| 产品能力 | 技术模块 |
|----------|----------|
| **低摩擦交互** | inline edit · sidebar · approval UI · HITL |
| **上下文智能** | profile · workspace · RAG · long-term memory · 权限 |
| **主动智能** | cron · webhook · event trigger · agent runner |

**本质：AI 不再是一个功能，而是系统的智能层**

*Building what you can't buy*

---

## 人的能力 · L3 → L6

| 层级 | 关键词 | 你在做什么 | AI 角色 |
|:----:|--------|------------|---------|
| **L3** | Chatting | 问 AI、用答案 | 咨询师 |
| **L4** | One-off | AI coding 做 demo | 外包 |
| **L5** | Reliability | 构建可靠 workflow | 逻辑引擎 |
| **L6** | Orchestration | 设计 AI 系统架构 | 系统控制层 |

---

<!-- _class: lead -->

# 四句话记牢

**L3** · 我会问 AI。

**L4** · 我会让 AI 帮我做一个东西。

**L5** · 我会把 AI 放进可靠流程。

**L6** · 我会设计 AI 驱动的系统。

---

## L5 Builder · 三项硬功夫

1. **Context Engineering**  
   Context window 是工作台，不是垃圾桶

2. **Evaluation**  
   没有 eval，就没有可靠性

3. **Iterative Mindset**  
   持续迭代 prompt · workflow · retrieval · HITL

---

## L6 Architect · 三项架构能力

1. **System Resilience** — retry · fallback · validation · escalation · observability

2. **Contextual Architecture** — working / long-term / transactional memory

3. **Orchestration & Integration** — 何时 workflow · 何时 agent · 何时交给人

> 不是「更复杂」，而是**复杂得有理由**

---

## 三个快问 · 定位你的项目

1. **用户使用时，AI 有没有参与？**  
   → 没有 = AI-assisted building

2. **AI 只会回答，还是会用工具 / 进流程 / 循环执行？**  
   → 决定 L1–L5

3. **有没有 memory · 权限 · eval · 主动触发？**  
   → 接近 L6

*完整版：文章中的 10 问自检框架*

---

## 学习路径（建议顺序）

```
L3  高质量用模型
 ↓
L4  AI coding 快速原型
 ↓
L5  workflow · RAG · eval · human-in-the-loop
 ↓
L6  orchestration · memory · runtime · proactive
```

不必一上来就做 multi-agent

---

<!-- _class: lead -->

# 真正的终点

不是「我会用 AI」

而是

**我能设计一个 AI 系统**  
**让它在真实世界里可靠地替我工作**

---

## 资源

| 资源 | 链接 |
|------|------|
| 完整文章 | `cognition/02-ai-product-six-layers.md` |
| 交互架构图 | `docs/diagrams/ai-product-six-layers.html` |
| 5 分钟视频全稿 | `docs/video/ai-product-six-layers-5min-full-script.md` |
| 原文 | [Superlinear Academy](https://www.superlinear.academy/c/ai-resources/ai-product) |
| Studio 在线阅读 | GitHub Pages · AI Cognition Studio |

**Q & A**
