---
title: AI Agent 开发系统架构 · 口播文稿（案例版）
date: 2026-06-21
type: presentation-script
diagram: docs/diagrams/ai-agent-dev-system.html
case: Cursor Agent · 登录页 + 测试
duration:
  short: 4–5 分钟（案例 + 逐步演示）
  standard: 7–9 分钟（案例铺垫 + 完整口播 + 收束）
related_article: cognition/03-interactive-arch-diagram.md
---

# AI Agent 开发系统架构 · 口播文稿（案例版）

> **配套交互图**：[`docs/diagrams/ai-agent-dev-system.html`](../../docs/diagrams/ai-agent-dev-system.html)  
> **演示方式**：Chrome 全屏，按 → / Space 步进，与下文 Step 01–08 一一对应  
> **讲解方式**：用 **Cursor 里一次真实写代码任务** 贯穿八步——先讲案例，再指图上的顺序与数据流。

---

## 贯穿案例（先讲这个，再点「下一步」）

**场景**：开发者在 **Cursor** 里用 Agent 改自己仓库里的代码（不是 Chat 只给建议，而是 Agent 真的读文件、改文件、跑命令）。

**开发者原话**（可贴在画面侧边或口播复述）：

> 「帮我在这个项目里加一个 **登录页**，走现有的 **auth 模块**，顺便把 **单元测试** 补上。」

**这一句话在系统里会发生什么**：不是模型直接吐一段 React 代码让你复制粘贴，而是走完整 Agent runtime——读仓库上下文、规划改哪些文件、调工具改代码、看测试结果、记会话、留 trace，最后把 diff 和说明给你。

**和「你用 Cursor 写代码」的区别**（开场可点一句）：

| | AI-assisted Building | 本图讲的 AI Runtime |
|--|------------------------|------------------------|
| 何时 | 你在 Cursor 里开发时 | 你发出上面那句话之后 |
| Agent 干什么 | 帮你写这个架构图 Skill | 读 repo、改登录页、跑测试 |

**案例与架构节点对照**：

| 案例里发生的事 | 对应图上节点 |
|----------------|--------------|
| 你在 Cursor 输入需求 | 用户 / App → API Gateway |
| Cloud / Local Agent 接手 | Agent Runtime |
| Rules、Skills、打开的文件、仓库索引 | Context Engine（RAG / Profile / Workspace） |
| 模型决定先读 auth 再改哪些文件 | Plan · LLM Provider |
| Read、Edit、Terminal、MCP | Tool Router → MCP / APIs |
| 看 lint / 测试是否通过 | Observe |
| 记住「登录页任务进度」 | Memory Store |
| Agent 日志、trace、用量 | Observability |
| 编辑器里看到 diff + 说明 | 响应输出 |

---

## 使用说明

| 模式 | 建议 |
|------|------|
| **快讲 4–5 分钟** | 案例 30s + 每步「案例口播」 |
| **标准 7–9 分钟** | 案例 + 每步「案例口播 + 完整口播」+ 收束 |
| **录屏** | 每步等动画结束；指顺序条 / 角标 /「步骤 N」标签 |

```bash
open -a "Google Chrome" docs/diagrams/ai-agent-dev-system.html
```

---

## 开场（进入 Step 01 之前）

**案例铺垫（35s，建议必讲）**

> 咱们用 **Cursor 写代码** 走一遍这张图。你在编辑器里说：给项目加登录页，用现有 auth，补测试。要是普通 Chat，多半给你一段组件代码，你自己找文件粘贴。Cursor Agent 会**按顺序**读仓库、改文件、跑测试、失败再改。图上 **1 到 8** 就是这一次任务的 runtime 顺序——和你本地是不是 Cursor 无关，**职责模型**是一样的。跟着这个需求走一遍。

**动作**：指 flow-strip，点「下一步」。

---

## 演示画面说明

| 画面元素 | 案例讲解时可指 |
|----------|----------------|
| flow-strip | 「加登录页这件事走到第几步」 |
| 步骤 N/8 | 与 Cursor 任务进度对齐 |
| 节点角标 | 这一步轮到哪个组件上场 |
| 连线「步骤 N」 | 当前动作在顺序里的位置 |

---

## Step 01 · 用户发起请求

**画面**：用户 / App → API Gateway（步骤 1）

**案例口播（25s）**

> ① 你在 **Cursor** 里发出那句话。请求先到 **API Gateway**——本地 Agent 或 Cloud 的连接层，带上传 session、workspace 路径、模型配置。不会把你的整盘代码直接砸给模型。蓝色 **步骤 1**：开发者的任务进站。

**完整口播（+20s）**

> 这一层还是工程问题：鉴权、限流、选 cloud / local runtime。Gateway 输出的是结构化任务：用户要什么、在哪个 repo、当前 branch 是什么——后面 Context 和 Memory 都靠这些字段接上。

**动作**：下一步。

---

## Step 02 · 路由至 Agent Runtime

**画面**：API Gateway → Agent Runtime（步骤 2）

**案例口播（25s）**

> ② Gateway 把任务交给 **Agent Runtime**。从这一刻起不是单次补全，而是 **Plan → Act → Observe** 循环：可能要读多个文件、改好几轮、跑测试直到绿。紫色 **步骤 2**，Cursor 里你看到的「Agent 正在思考 / 调工具」，就是这一层在转。

**完整口播（+15s）**

> Runtime 维护任务状态：目标仍是「登录页 + 测试」，已改过哪些文件、还剩几步、是否该停下来问你确认——这是编排器，不是某一个模型品牌。

**动作**：下一步。

---

## Step 03 · 加载上下文

**画面**：Context Engine → Runtime，RAG / Profile / Workspace 高亮（步骤 3）

**案例口播（35s）**

> ③ **Context Engine** 先组装「模型该看见什么」。**RAG**：从仓库索引里检索 `auth` 相关模块、路由约定；**Profile**：你的规则偏好（例如必须用 TypeScript、测试放哪）；**Workspace**：当前打开的文件、`AGENTS.md`、`.cursor/rules`、甚至 Skills 列表。注入 Runtime 后，模型才知道项目里**已有** auth，而不是从零写一套。绿色 **步骤 3**。

**完整口播（+20s）**

> Context Engineering 在 Cursor 里就是 rules + skills + 检索 + 打开文件——不是把整库塞进 context window。漏掉 auth 模块，登录页就会和现有架构对不上。

**动作**：下一步。

---

## Step 04 · LLM 推理（Plan）

**画面**：Runtime ↔ LLM，Plan 高亮（步骤 4 · Plan）

**案例口播（30s）**

> ④ **Plan** 阶段：Runtime 把上下文发给 **LLM**。模型这次不直接贴整页代码，而是出计划：先 `Read` auth 服务，再 `Edit` 新增 `LoginPage.tsx`，再 `Edit` 路由，最后 `Shell` 跑测试。看上轨推理、下轨计划两条紫线——**步骤 4 · Plan**，先想后动。

**完整口播（+20s）**

> 生产里应是 tool call 或结构化 plan。Plan 错了，后面就会改错文件、漏测、或者无限 read 不 write。

**动作**：下一步。

---

## Step 05 · 调用工具（Act）

**画面**：Runtime → Tool Router → MCP/APIs（步骤 5 · Act）

**案例口播（35s）**

> ⑤ **Act**：按计划真动手。**Tool Router** 把调用分到具体工具：内置的 Read / Edit / Grep / Terminal，以及你配的 **MCP**（查文档、浏览器验证、内部 API）。例如读出 `auth.ts`、写入登录页、执行 `npm test`。Router 还做权限控制——哪些目录可写、哪些命令可跑。橙色 **步骤 5 · Act**。

**完整口播（+15s）**

> 这就是 Agent 的「手脚」。Cursor 里每一次 tool call，都走类似的执行层；MCP 把外部能力挂进同一条路。

**动作**：下一步。

---

## Step 06 · 观察结果（Observe）

**画面**：工具结果回流 Runtime，Observe 高亮（步骤 6 · Observe）

**案例口播（30s）**

> ⑥ **Observe**：测试跑完，假设 `LoginPage` 有一个 import 报错。Runtime 看结果：还没完成，进入下一轮 Plan——修 import，再跑测试。若全绿，才进入最终回复。若改动了敏感文件，也可能在这里 **Ask** 你确认。图上 **步骤 6 · Observe**，橙线回流。

**完整口播（+15s）**

> 和 Chat 的差别：Chat 不会根据测试失败自动再改一轮。Observe + 停止条件（最大步数、超时）决定 Agent 是继续还是收尾。

**动作**：下一步。

---

## Step 07 · 持久化与可观测

**画面**：Memory + Observability（步骤 7）

**案例口播（30s）**

> ⑦ 并行两件事：**Memory** 记下「本仓库已加登录页、auth 入口在 `lib/auth`、测试在 `__tests__`」——你下一句「把注册页也加上」能接上；**Observability** 记录这次 Agent 的 **Trace**：调了哪些工具、每步 token、哪一步失败。团队用 **Eval** 看「类似任务一次成功率」。绿 + 青 **步骤 7**。

**完整口播（+20s）**

> 没有 Memory，新会话会重复问同样问题；没有 Trace，登录页改坏了无法复盘是模型瞎改还是测试环境不对。

**动作**：下一步。

---

## Step 08 · 返回响应

**画面**：Runtime → 响应 → API → 用户（步骤 8）

**案例口播（25s）**

> ⑧ Runtime 生成你能直接用的结果：编辑器里的 **diff**、简短说明「已接 auth、测试通过」、可能还有下一步建议。经 Gateway 回到 Cursor UI。对你是一次对话；对系统可能已 Read/Edit/Shell 多轮。蓝色 **步骤 8**，回路闭合。

**完整口播（+15s）**

> 好的响应绑定真实文件变更，而不是纯 Markdown 代码块。流式输出时你也会先看到工具调用、后看到总结。

**动作**：可「重置」再过一遍，或进入收束。

---

## 收束

**案例回扣（30s）**

> 回到 Cursor 里那句话：加登录页、用 auth、补测试。完整 runtime 是读仓库、改文件、跑测试、能复盘；纯 Chat 只是一段可能跑不起来的代码。五色对照：**蓝**你与编辑器，**紫**编排与推理，**绿**规则与记忆，**橙**工具与命令，**青**trace 与 eval。

**完整收束（+30s）**

> 你本人用 Cursor 写这个口播稿，是在 **Building** 层；用户打开你做的 Agent 产品，跑的是这张图。下一步：拿你仓库里**真实一句话需求**，按 1–8 填 `content-template`，生成自己的架构图——节点名可以换成 Read/Edit/Shell，顺序不变。谢谢。

---

## 附录 A · 案例时间线（Cursor 登录页）

| 步 | 这次写代码任务里发生了什么 |
|----|----------------------------|
| 1 | Cursor 输入：「加登录页，用 auth，补测试」→ Gateway |
| 2 | Agent Runtime 接手，进入循环 |
| 3 | 拉 rules/skills、检索 auth 模块、当前 workspace |
| 4 | Plan：Read auth → Edit 页面与路由 → Shell 测试 |
| 5 | Act：Read/Edit/Grep/Terminal（+ 可选 MCP） |
| 6 | Observe：测试失败则修 import 再跑，成功则收尾 |
| 7 | Memory 记任务进度；Trace 记每步 tool 与 token |
| 8 | 响应：diff + 说明回到编辑器 |

---

## 附录 B · 提词器极简版（Cursor 口吻）

| 步 | 提词 |
|----|------|
| 开 | Cursor：加登录页用 auth 补测试，跟八步走 |
| 1 | 蓝：你在 Cursor 发需求，Gateway 进站 |
| 2 | 紫：Runtime 接手，Agent 循环开始 |
| 3 | 绿：rules + 检索 auth + workspace 注入 |
| 4 | 紫：Plan 先读 auth 再改哪几个文件 |
| 5 | 橙：Read Edit Terminal 真改真跑 |
| 6 | 橙：Observe，测试不过就再改一轮 |
| 7 | 绿青：记任务进度，留 agent trace |
| 8 | 蓝：diff 和说明回到编辑器 |
| 收 | Agent 改真文件；Chat 只给代码片段 |

---

## 附录 C · 可展示「开发者原话」卡片（录屏用）

```text
项目：ai-cognition-studio（本地仓库）
原话：帮我在这个项目里加一个登录页，
      走现有的 auth 模块，顺便把单元测试补上。
```

---

## 附录 D · Cursor 概念与图上节点速查

| 你熟悉的 Cursor | 图上盒子 |
|-----------------|----------|
| Chat 输入框 | 用户 / App |
| Cloud / Local 连接 | API Gateway |
| Agent 循环 | Agent Runtime |
| Rules · Skills · 索引检索 | Context Engine |
| 模型 API | LLM Provider |
| Read · Edit · Grep · Shell | Tool Router → MCP / APIs |
| 终端 / MCP Server | MCP / APIs |
| 会话记忆 · 项目上下文 | Memory Store |
| Agent 日志 · 用量 | Observability |
| Diff · 回复气泡 | 响应输出 |

---

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-21 | v0.1 配套八步演示 |
| 2026-06-21 | v0.2 案例「EO-8842 催发货」 |
| 2026-06-21 | v0.3 案例改为 Cursor 写代码「登录页 + auth + 测试」 |
