---
title: project-incubator · 项目 0→1 孵化 Skill
date: 2026-06-13
status: stable
audience: [self, dev]
tags: [skill, claude-code, product, prd, ued, prompt]
summary: 从一句项目想法出发，通过阶段闸门推进到产品方案、PRD、交互 Demo、技术方案与实现 Prompt。
portfolio:
  order: 1
  label: Product · Skill · Agent Workflow
  outcome: 把一句模糊的项目想法推进为产品方案、视觉预览、PRD、Demo 与实现 Prompt。
  capabilities: [产品判断, 工作流设计, Skill, Agent]
---

# Project Incubator

> **一句话结论**：Agent 的价值不在于一次生成更多文字，而在于管理决策顺序、暴露假设，并让人与模型在关键节点重新对齐。

## 问题背景

很多“帮我做一个产品”的 AI 工作流会过早给出完整答案。模型在需求尚未澄清时生成 PRD，在产品边界尚未确定时设计功能，在视觉方向尚未验证时直接写实现 Prompt。产物看似完整，但领域深度被通用模板压平，关键假设被藏进流畅的文字里，返工通常发生在流程末端。

Project Incubator 解决的不是“怎样生成一份更长的 PRD”，而是“怎样让模型按正确顺序参与产品决策”。它把项目孵化拆成 8 个阶段，每个阶段都有明确进入条件、产物标准和用户确认闸门。

## 我的角色

- **产品工作流设计**：定义阶段顺序、进入条件和产物边界。
- **Agent / Skill 工程**：把流程编码为可显式触发、可按需加载 reference 的 Skill。
- **质量控制设计**：在每份正式产物中加入同行挑刺，迫使模型暴露遗漏和想当然。

## 四个关键判断

### 1. 先激活领域专家，再讨论功能

Stage 0 不接受“Web 应用”“效率工具”这种泛领域标签。模型必须先识别具体子领域、激活 2–4 个专家身份，并列出通用 PM 模板通常会忽略的深度维度。

### 2. 把用户确认写进工作流

每个阶段结束后必须停止。用户没有确认，就不能靠模型自行推断进入下一阶段。阶段闸门不是礼貌提示，而是工作流状态的一部分。

### 3. 在 PRD 前验证视觉方向

流程增加 Stage 2.5，用 3–5 页轻量 HTML 预览验证信息架构和交互方向。先发现视觉理解偏差，再投入完整 PRD 和正式 Demo。

### 4. 用同行批评对抗“完整但平庸”

每份正式文档都要回答：一个有 10 年经验的同行会指出哪些想当然、浅层或遗漏？列不出 3 条具体批评，说明模型还没有真正进入领域。

## 八阶段系统

1. **领域识别与专家激活**：确定子领域、专家视角和深度维度。
2. **需求访谈**：通过多轮问题澄清用户、场景、约束和成功标准。
3. **产品方案**：给出边界明确、可供用户选择和修订的方案。
4. **早期视觉预览**：在 PRD 前用轻量 HTML 锁定布局与交互方向。
5. **PRD**：将已确认的产品与视觉判断写成完整规格。
6. **UED 交互 Demo**：产出可操作的高保真 HTML 原型。
7. **技术方案**：定义架构、数据、接口、风险和验证方式。
8. **实现 Prompt**：拆成初始化、核心功能、完善验收三份执行 Prompt。

## 可检查的产物

| 产物 | 用途 |
|------|------|
| [`SKILL.md`](SKILL.md) | 主编排、Stage 0、阶段闸门和落盘约定 |
| [`references/global-rules.md`](references/global-rules.md) | 全局质量规则、同行自检和输出约束 |
| `references/stage-*.md` | 各阶段按需加载的详细规范 |
| [`agents/openai.yaml`](agents/openai.yaml) | Codex 展示名和显式触发配置 |
| 本文流程图 | 让访客直接检查阶段顺序与确认点 |

## 一次真实触发记录

2026 年 6 月，用户在 Codex 中显式调用：

```text
$project-incubator 做一个帮助 AI 初学者规划学习路线的网站
```

Skill 正确进入 Stage 0，识别出“AI 初学者个性化学习路径规划与实践型课程导航”领域，并从前置能力诊断、知识依赖图谱、目标分层、实践反馈、内容时效性、认知负荷、能力证明和可信边界等维度展开。完成 Stage 0 后，工作流停止并等待用户确认，没有自行跳到需求访谈。

这次运行验证了：

- Codex 可以通过 `$project-incubator` 显式触发 Skill。
- Stage 0 能把泛化想法转成领域专家视角。
- 阶段结束后会停止，要求用户确认再继续。

这次运行没有验证：

- Stage 1–6 的完整跨阶段连续性。
- 长流程跨会话后的状态恢复。
- PRD、Demo 与实现 Prompt 对真实开发效率的量化提升。

## 安装与调用

### Codex

Codex 从 `~/.agents/skills/`（用户级）或 `.agents/skills/`（项目级）加载 Skill。

```bash
mkdir -p ~/.agents/skills/project-incubator/{references,agents}
cp labs/project-incubator/SKILL.md ~/.agents/skills/project-incubator/
cp labs/project-incubator/references/*.md ~/.agents/skills/project-incubator/references/
cp labs/project-incubator/agents/openai.yaml ~/.agents/skills/project-incubator/agents/
```

调用：

```text
$project-incubator 做一个个人记账 web app
```

### Claude Code

```bash
mkdir -p ~/.claude/skills/project-incubator/references
cp labs/project-incubator/SKILL.md ~/.claude/skills/project-incubator/
cp labs/project-incubator/references/*.md ~/.claude/skills/project-incubator/references/
```

调用：

```text
/project-incubator 做一个个人记账 web app
```

## 产出目录

```text
<project-slug>/
├── preview/
├── prd/
├── prd-assets/
├── demo/
├── tech/
├── tech-assets/
└── prompts/
```

## 限制与下一步

长流程会消耗大量上下文，跨会话恢复目前依赖已落盘产物和用户重新确认当前阶段。下一步需要用一个真实项目完整跑通 Stage 0–6，记录每阶段耗时、返工原因、上下文体积和最终实现偏差，再决定是否引入机器可读的状态文件。

HTML Demo 阶段目前限定原生 HTML/CSS/JS，以降低运行环境差异；这会限制复杂应用原型，但能让视觉验证保持低成本和可移植。

Skill 同时支持 Codex 与 Claude Code，但 Cursor 仍需要调整 front matter 或拆成 Rules + Prompt，尚未形成完全一致的三端运行语义。

## 该领域同行会怎么挑刺

1. **“阶段闸门只控制顺序，不证明产出质量。”** 已在全局规则中加入同行自检，但仍需要真实项目的验收数据；完整量化验证推到下一轮端到端运行。
2. **“八阶段对小项目可能过重。”** 当前用显式调用避免误触发，但尚未提供轻量模式；在收集完整运行数据前不提前增加分支复杂度。
3. **“跨会话状态只靠文档，容易丢失决策上下文。”** 已通过阶段落盘降低风险；机器可读状态和恢复协议推到 v2，因为需要先观察真实中断模式。
