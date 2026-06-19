---
title: project-incubator · 项目 0→1 孵化 Skill
date: 2026-06-13
status: stable
audience: [self, dev]
tags: [skill, claude-code, product, prd, ued, prompt]
summary: Claude Code Skill：从项目想法经多轮确认到 PRD、UED HTML Demo、技术方案，再到 3 份 Cursor/Codex 实现 Prompt 的完整孵化流水线。
portfolio:
  order: 1
  label: Product · Skill · Agent Workflow
  outcome: 把一句模糊的项目想法推进为产品方案、视觉预览、PRD、Demo 与实现 Prompt。
  capabilities: [产品判断, 工作流设计, Skill, Agent]
---

# project-incubator

Claude Code **Skill**：把「我有一个项目想法」变成可交给 Cursor / Codex 实现的完整规格包。

## TL;DR

8 阶段流水线，每阶段强制 STOP 等用户确认：

`领域识别 → 需求访谈 → 产品方案 → 早期视觉预览 → PRD → UED Demo → 技术方案 → 3 份实现 Prompt`

## 使用

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

### Codex（本机）

Codex 从 **`~/.agents/skills/`**（用户级）或 **`.agents/skills/`**（项目级）加载 skill，与 Claude Code 的 `~/.claude/skills/` 是不同目录。

```bash
mkdir -p ~/.agents/skills/project-incubator/{references,agents}
cp labs/project-incubator/SKILL.md ~/.agents/skills/project-incubator/
cp labs/project-incubator/references/*.md ~/.agents/skills/project-incubator/references/
cp labs/project-incubator/agents/openai.yaml ~/.agents/skills/project-incubator/agents/
```

调用方式（任选）：

```text
$project-incubator 做一个个人记账 web app
```

或在 Codex 输入 `$` 搜索 **项目孵化**，选中后补项目想法。

`agents/openai.yaml` 里 `allow_implicit_invocation: false` 表示只有显式 `$project-incubator` 才启动，避免误触发。

安装后若 skill 未出现，**重启 Codex**。

### 项目级（跟仓库走）

```bash
mkdir -p .agents/skills/project-incubator/{references,agents}
cp path/to/ai-cognition-studio/labs/project-incubator/SKILL.md .agents/skills/project-incubator/
cp path/to/ai-cognition-studio/labs/project-incubator/references/*.md .agents/skills/project-incubator/references/
cp path/to/ai-cognition-studio/labs/project-incubator/agents/openai.yaml .agents/skills/project-incubator/agents/
```

## 文件结构

| 文件 | 说明 |
|------|------|
| `SKILL.md` | 主入口：编排、Stage 0、阶段闸门、产出目录约定 |
| `references/global-rules.md` | 全局规则、专家自检、输出语气 |
| `references/stage-1-interview.md` | 多轮需求访谈 |
| `references/stage-2-product-plan.md` | 产品方案（待确认） |
| `references/stage-2.5-preview.md` | 早期视觉预览 Demo（3–5 页） |
| `references/stage-3-prd.md` | PRD 完整结构 |
| `references/stage-4-demo.md` | UED HTML 高保真交互 Demo |
| `references/stage-5-tech.md` | 技术实现方案 |
| `references/stage-6-prompts.md` | 3 份 Cursor/Codex 实现 Prompt |

## 产出目录（cc 运行时落在当前工作目录）

```
<project-slug>/
├── preview/           # Stage 2.5
├── prd/               # Stage 3
├── prd-assets/        # 流程图 / 状态机 HTML+SVG
├── demo/              # Stage 4
├── tech/              # Stage 5
├── tech-assets/       # ERD 等
└── prompts/           # Stage 6 → 交给 Cursor / Codex
```

## 设计要点

- **`disable-model-invocation: true`**：仅手动 `/project-incubator` 触发，防止 cc 自动跳阶段
- **领域深度优先**：Stage 0 激活专家身份与深度维度，避免通用 PM 模板化
- **Stage 2.5 早期预览**：在 PRD 之前用轻量 HTML 锁定视觉/交互方向，减少返工
- **references 分包**：各阶段规范按需 Read，控制 context 体积

## 与 cursor-skill-template 的关系

| | cursor-skill-template | project-incubator |
|---|----------------------|-------------------|
| 用途 | 空白 Skill 结构模板 | 完整产品孵化工作流 |
| 触发 | Cursor Agent | Claude Code `/project-incubator` |
| 产出 | 你自己填的 skill | PRD + Demo + 技术方案 + 实现 Prompt |

## 局限

- 面向 Claude Code Skill 格式；Cursor 侧需改 front matter 或拆成 Rules + Prompt
- 长流程依赖用户每阶段确认，不适合「一次性出全套」的场景
- HTML Demo 阶段要求纯 HTML/CSS/JS，不含 React/Vue 实现

## 延伸阅读

- [playbooks/skill-authoring-checklist.md](../../playbooks/skill-authoring-checklist.md)
- [cursor-skill-template](../cursor-skill-template/)
- [prompt-patterns](../prompt-patterns/)
- [Claude Code Skills 文档](https://code.claude.com/docs/en/slash-commands)
