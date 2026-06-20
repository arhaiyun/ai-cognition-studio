---
title: AI 产品的六个层次 · Presentation 讲解稿
date: 2026-06-20
type: presentation-script
slides: docs/presentation/ai-product-six-layers-slides.md
duration:
  short: 12–15 分钟（精简口播）
  standard: 18–22 分钟（完整口播）
related_article: cognition/02-ai-product-six-layers.md
---

# AI 产品的六个层次 · Presentation 讲解稿

> **配套 PPT**：[`ai-product-six-layers-slides.md`](ai-product-six-layers-slides.md)（Marp 导出 PPTX/PDF）  
> **幻灯片编号**：与 Marp 顺序一致，共 **20 页**

---

## 使用说明

| 模式 | 建议 |
|------|------|
| **15 分钟场** | 用每页「精简口播」，L1–L6 每层约 40 秒 |
| **20 分钟场** | 用「完整口播」，L1–L6 可展开举例 |
| **互动** | Slide 03 后问举手；Slide 17 后让观众自评项目层级 |
| **演示** | Slide 06 前可切浏览器打开架构图 HTML 30 秒 |

**导出 PPT**：

```bash
# 安装 Marp CLI 后
npx @marp-team/marp-cli docs/presentation/ai-product-six-layers-slides.md --pptx -o ai-product-six-layers.pptx
npx @marp-team/marp-cli docs/presentation/ai-product-six-layers-slides.md --pdf -o ai-product-six-layers.pdf
```

或在 VS Code 安装 **Marp for VS Code** 插件 → 导出 PPTX。

---

## Slide 01 · 标题页

**页面**：会用 AI 写代码 ≠ 会做 AI 产品

**精简口播（20s）**

> 大家好。今天分享一个我最近在用的框架：怎么判断一个东西算不算 AI 产品，以及它和「会用 AI 写代码」有什么区别。标题先抛结论——**会用 AI 写代码，不等于会做 AI 产品。**

**完整口播（35s）**

> 大家好，我是 [名字]。这期是 AI Cognition Studio 连载第六篇的 presentation 版。过去一两年，很多人第一次用 Cursor、Claude Code 做出了网页、插件、自动化脚本，很有成就感。但我也观察到一个常见误会：把「AI 帮我写完了代码」等同于「我做了一个 AI 产品」。今天用大约 [15/20] 分钟，把这两个概念分开，并给出一张六层地图，帮你看清自己或团队现在在哪、下一步该补什么。

**动作**：站定，停顿 1 秒，进入下一页。

---

## Slide 02 · 今天讲什么

**精简口播（25s）**

> 议程五条：先讲 Building 和 Runtime 的区别；再讲 AI 应用六层；然后是人的能力 L3 到 L6；接着是自检框架；最后是学习路径和资源。内容基于 Superlinear Academy 的文章，我做了结构化整理和架构图。

**完整口播（40s）**

> 五条线，建议你们带着一个问题听：**我现在的项目，在地图上的哪一层？** 第一层 distinction 最关键，后面六层是成熟度模型，人的四档是能力模型，两者对照看会很有感觉。文末有完整文章和可交互架构图链接。

---

## Slide 03 · 一个常见误会

**精简口播（20s）**

> 很多同行做完 demo 会有这种感受——「我已经会做 AI 产品了」。下一页我们会说明：不一定。

**完整口播（30s）**

> 这里我不否定 demo 的价值。demo 训练产品感、工程感、试错速度，非常重要。但要警惕一种虚假自信：把 happy path 上的原型，误认为 production-ready 的 AI 系统。

**互动（可选）**：「有多少人用 AI coding 做过至少一个能跑的东西？」→ 「有多少人用户使用时 AI 会真正执行任务？」

---

## Slide 04 · Building vs Runtime

**精简口播（90s）**

> 左边 **AI-assisted building**：AI 在开发时帮你写代码。用户打开产品，AI 不参与。比如 Cursor 写的普通日历。  
> 右边 **AI runtime**：用户使用时 AI 在干活——读上下文、调工具、判断、执行、记忆。比如邮件助手完整链路。  
> 判断标准一句话：**不看开发时有没有用 AI，而看 runtime 里 AI 是否承担任务执行的一部分。** 这条标准比「有没有接 OpenAI API」准确得多。

**完整口播（2min）**

> 展开左边：代码可能是 AI 写的，但 runtime 里没有模型参与，这就是「AI 辅助造软件」，不是 AI 产品。  
> 展开右边：哪怕代码很简单，只要用户用时系统在读取邮件、判断意图、生成回复、调用 Gmail、等待确认——就已经有 AI runtime。  
> 再强调：VC 看 startup、团队招 AI 相关岗位，越来越会问 runtime 深度，而不是「你们开发时用了 Copilot 吗」。

**过渡**：「有了这条线，我们再看六层。」

---

## Slide 05 · 六层总览

**精简口播（45s）**

> 六层自下而上：L1 Wrapper，模型当功能；L2 RAG，知道更多但仍回答；L3 调工具，长手脚；L4 Workflow，进可控流程；L5 Agent，模型控制执行循环；L6 AI-native，AI 成为系统智能层。接下来逐层过，每层记住「本质」那一句话就够。

**完整口播（1min）**

> 这是整张地图的缩略版。行业上 Anthropic 分 workflow 和 agent，OpenAI 强调 agent 要控制执行，Google 拆 model、grounding、tools、orchestration、runtime——说的都是同一件事：**真正的能力是把模型放进可靠系统。** 建议拍照这一页，后面对照项目。

**演示（可选）**：打开 `docs/diagrams/ai-product-six-layers.html` 指 layers-stack。

---

## Slide 06 · L1 Prompt Wrapper

**精简口播（40s）**

> L1：输入、模板、模型、输出。标题生成、润色、简历优化。没有上下文、工具、状态，很薄，容易被复制。本质：**模型当功能。**

**完整口播（55s）**

> 有价值，很多单点任务一次调用就够。但如果你的「AI 产品」只有这一层，壁垒 mainly 在 prompt 和 UI，而不是系统。对应人的能力，往往是 L4 的早期作品。

---

## Slide 07 · L2 RAG

**精简口播（45s）**

> L2：先检索再回答。FAQ、知识库、助教。难点在 chunking、混合检索、权限、引用，不是 prompt 玄学。本质：**知道更多，但仍主要是回答。**

**完整口播（1min）**

> 狭义 RAG 不好用是常见痛点——这层的工程深度被低估。Google 把 grounding 视为 agent 可信度的关键。如果你在做企业知识库，重点应放在 retrieval 质量，而不是换更强模型。

---

## Slide 08 · L3 Tool-using AI

**精简口播（45s）**

> L3：模型开始调 API——日历、邮件、CRM。要有 schema、鉴权、确认、错误处理。本质：**模型是工具入口。** 但很多产品只调用一次，还没有规划循环。

**完整口播（1min）**

> 举例：研究助手能读 tabs、存 Notion，是 L2+L3；若还能持续跟踪目标、主动整理，才往 L5 走。同样是浏览器工具，层级可以差很远。

---

## Slide 09 · L4 Workflow

**精简口播（50s）**

> L4：程序员设计流程，AI 在节点里分类、检索、生成、审批。退款、合同初审、bug triage。要的是**可预测**，不是单次聪明。Anthropic 的 workflow。**L5 Builder 主战场。**

**完整口播（1min 10s）**

> 很多场景不该一上来 agent。路径清楚的任务，workflow 更稳、更便宜、更好 eval。关键设计：哪些步骤必须 human-in-the-loop，哪些结果要写进日志做回归测试。

---

## Slide 10 · L5 Agentic Core

**精简口播（50s）**

> L5：Plan、Act、Observe 循环，模型**控制执行**。要 guardrails、eval、tracing、人工交接。OpenAI/Google 定义的 Agent 在这里。

**完整口播（1min 10s）**

> 不是「更自由的 prompt」，而是有 stop condition、有 state、有 tool registry。失败要能 escalation，不能无限 loop。这是 L6 的底层引擎，但还不是完整产品。

---

## Slide 11 · L6 AI-native System

**精简口播（60s）**

> L6 加三块：**低摩擦交互**——嵌进现有工作流；**上下文智能**——记忆、权限、数据流；**主动智能**——cron、webhook、事件触发。AI 是系统智能层，Building what you can't buy。

**完整口播（1min 30s）**

> 举例：每日 briefing、会议前自动备料、inbox triage、个人 chief of staff、企业内部 agent platform。大厂给你通用模型和框架，但你的数据、工作流、风险偏好、协作习惯——通用产品覆盖不全，L6 是建自己的 AI operating system。

---

## Slide 12 · 人的能力 L3–L6

**精简口播（50s）**

> 产品六层之外，看人的四档：L3 消费输出，L4 做 demo，L5 建可靠流程，L6 设计系统架构。AI 角色从咨询师、外包、逻辑引擎到系统控制层。

**完整口播（1min）**

> 注意：产品 L1–L6 和人的 L3–L6 **编号不同**。L3 Consumer 主要在消费 L1–L2 型产品；L6 Architect 在设计 L5–L6 型系统。不要混为一谈。

---

## Slide 13 · 四句话记牢

**精简口播（35s）**

> 我会问 AI；我会让 AI 帮我做一个东西；我会把 AI 放进可靠流程；我会设计 AI 系统。从 L4 到 L5 是**可靠性**分水岭，从 L5 到 L6 是**架构**分水岭。

**完整口播（50s）**

> 建议把这一页当团队对齐用语。评审项目时问：我们在解决的是 L4 demo，还是 L5 workflow，还是 L6 系统？

**动作**：每句停顿 2 秒，让观众跟读或记笔记。

---

## Slide 14 · L5 三项硬功夫

**精简口播（45s）**

> Context Engineering：对的信在对的时间。Evaluation：没有指标就没有可靠。Iteration：prompt、flow、retrieval、HITL 持续改。

**完整口播（1min）**

> 合同审查不能只看「通顺」，要看风险条款识别率、误漏率。客服退款要看分类准确率、误批率、升级人工比例。这是 L5 和 L4 的分水岭。

---

## Slide 15 · L6 三项架构能力

**精简口播（45s）**

> 韧性：retry、fallback、可观测。上下文架构：三种 memory。编排集成：何时 workflow、何时 agent、何时交给人。复杂要有理由。

**完整口播（1min）**

> 用 OpenClaw、Hermes 等框架改配置，若不懂 boundary、eval、memory hygiene，可能仍是 L4。工具提高起点，不替代架构能力——像会用 Kubernetes 不等于云架构师。

---

## Slide 16 · 三个快问

**精简口播（60s）**

> 第一，用户用时 AI 参与吗？第二，只会回答还是会工具/流程/循环？第三，有 memory、权限、eval、主动触发吗？文章里有完整十问。

**完整口播（1min 30s）**

> 十问从「是不是 AI 产品」问到「是否成为工作系统一部分」。建议团队立项时用这张 checklist，避免把 wrapper 叫 agent。

**互动**：让观众心里默答三问，举手示意自评在 L1–L3 / L4 / L5+。

---

## Slide 17 · 学习路径

**精简口播（35s）**

> L3 用模型 → L4 原型 → L5 workflow 和 eval → L6 orchestration 和 runtime。不必第一步就 multi-agent。

**完整口播（50s）**

> 卡住 L3 就练 prompt 和任务拆解；卡住 L4 就练 debug、部署、edge case；卡住 L5 就练 RAG 和 eval；冲 L6 就练 memory、权限、主动触发和真实集成。

---

## Slide 18 · 真正的终点

**精简口播（30s）**

> 终点不是「我会用 AI」，而是**设计一个 AI 系统，让它在真实世界可靠地替我工作**。谢谢。

**完整口播（45s）**

> L3 消费，L4 调动，L5 驯化，L6 架构——这是能力跃迁，不是工具清单。欢迎交流你们项目在哪一层。

---

## Slide 19 · 资源

**精简口播（25s）**

> 文章、架构图、视频全稿都在仓库里，QR 或简介链接。Q&A 开始。

**完整口播（40s）**

> 推荐先看交互架构图再读长文。Studio 站点可在线阅读。有问题可以针对具体项目层级一起讨论。

---

## 附录 · 15 分钟 vs 20 分钟裁剪

| 若超时 | 删除/压缩 |
|--------|-----------|
| **压到 15min** | Slide 14–15 各 30s；L1–L6 不展开举例；Slide 03 互动省略 |
| **扩到 20min** | 每层加 1 个真实产品案例；Slide 04 加 tab 管理器 vs research agent 对比；Slide 11 加评论区「低自主 + 高信任」案例 |

---

## 附录 · 开场 / 结尾备用句

**备用开场**

> 如果 AI 时代只学一件事，我会学：**怎么判断一个系统是不是在 runtime 里用了 AI，而不是只在 git history 里用了 AI。**

**备用结尾**

> Wrapper 会越来越便宜，架构能力会越来越贵。愿我们都能从 L4 的 demo，走到 L6 的系统。谢谢。

---

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-20 | v1.0：20 页 PPT 配套讲解稿（精简 + 完整双轨） |
