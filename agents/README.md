---
title: AI Agent 实践模块
date: 2026-06-14
status: stable
audience: [self, dev]
tags: [agent, skill, cursor, codex, orchestration]
summary: 应用子 Agent 的专用工作区：每个子目录是一个可独立安装、可组合的 Sub-Agent，与 labs 的工具型 Mini 项目区分。
---

# Agents · AI Agent 实践

> **TL;DR**：`agents/` 存放**应用向 Sub-Agent**（有明确职责、可安装到 Cursor/Codex、可组合编排）。`labs/` 继续放 MCP 演示、模板与工具型 Skill。

---

## 与 `labs/` 的区别

| | `agents/` | `labs/` |
|---|-----------|---------|
| 定位 | 应用子 Agent 实践 | Mini 项目 / 工具 / 模板 |
| 典型产物 | SKILL + 编排说明 + references | 可运行代码、MCP Server |
| 生命周期 | 长期迭代、可注册组合 | 可 fork 的一次性示例 |
| 示例 | 风控审查 Agent、写作 Agent | mcp-hello、prompt-patterns |

---

## 目录结构

```
agents/
├── README.md              # 本文件（模块说明）
├── registry.yaml          # Sub-Agent 注册表
├── _template/             # 新建 Agent 脚手架（不参与索引）
└── <agent-name>/          # 每个 Sub-Agent 一个目录
    ├── README.md          # 职责、触发词、安装、局限
    ├── SKILL.md           # Cursor / Codex Skill 定义
    ├── agents/
    │   └── openai.yaml    # Codex 接口（display_name、default_prompt）
    ├── references/        # 领域知识、阶段文档（可选）
    ├── prompts/           # 可复用 Prompt 片段（可选）
    └── tools/             # MCP 配置、脚本（可选）
```

---

## 注册表

所有已发布的 Sub-Agent 登记在 [`registry.yaml`](registry.yaml)。Studio 导航会索引各 Agent 的 `README.md`。

当前：**0 个 Sub-Agent**（使用 `_template/` 或脚本创建第一个）。

---

## 新建 Sub-Agent

### 方式一：脚本（推荐）

```bash
./scripts/new-agent.sh my-agent "我的 Agent 显示名"
```

### 方式二：手动

```bash
cp -R agents/_template agents/my-agent
# 编辑 README.md、SKILL.md、agents/openai.yaml
# 在 registry.yaml 追加条目
```

### 安装到运行时

**Cursor**

```bash
mkdir -p ~/.cursor/skills/my-agent
cp agents/my-agent/SKILL.md ~/.cursor/skills/my-agent/
cp -R agents/my-agent/references ~/.cursor/skills/my-agent/ 2>/dev/null || true
```

**Codex**

```bash
mkdir -p ~/.agents/skills/my-agent/{agents,references}
cp agents/my-agent/SKILL.md ~/.agents/skills/my-agent/
cp agents/my-agent/agents/openai.yaml ~/.agents/skills/my-agent/agents/
cp -R agents/my-agent/references/* ~/.agents/skills/my-agent/references/ 2>/dev/null || true
```

---

## 组合与编排（预留）

后续可在本模块增加：

- `agents/orchestrator/` — 主 Agent 路由到 Sub-Agent
- `registry.yaml` 的 `depends_on` / `triggers` 字段 — 声明 Agent 间关系
- MCP 统一入口 — 从外部系统调用 Sub-Agent

---

## 规范

- 每个 Agent **必须有** `README.md` + `SKILL.md` + `agents/openai.yaml`
- 密钥放 `.env.example`，**禁止** commit 真实密钥
- 草稿放 `.private/`，定稿后再迁入 `agents/<name>/`
- 详见 [CONTRIBUTING.md](../CONTRIBUTING.md) 与 [playbooks/agent-authoring-checklist.md](../playbooks/agent-authoring-checklist.md)

---

## 延伸阅读

- [Agent 编写 Checklist](../playbooks/agent-authoring-checklist.md)
- [Skill 编写 Checklist](../playbooks/skill-authoring-checklist.md)
- [project-incubator](../labs/project-incubator/) — 0→1 产品孵化（偏 Lab / 流水线 Skill）
