---
title: inspiration-curator · 日常灵感整理 Agent
date: 2026-06-14
status: exploring
audience: [self, dev]
tags: [agent, deepseek, inspiration, llm]
summary: 调用 DeepSeek API 理解零散日常灵感，输出结构化整理（主题、标签、澄清问题、建议归档路径）。
---

# inspiration-curator · 日常灵感整理

> **TL;DR**：把随手记录的碎片想法丢给 DeepSeek，得到结构化整理结果，便于迁入 `cognition/`、`essays/` 或 `.private/drafts/`。

## 职责

- 理解口语化、零散的**日常灵感输入**
- 提炼核心观点、主题与标签
- 标注类型（认知 / 长文 / lab / 任务 / 待观察）
- 列出需澄清的问题与**建议下一步**（含推荐目录）

## 快速开始

### 1. 配置 API Key

```bash
cd agents/inspiration-curator/tools
cp .env.example .env
# 编辑 .env，填入 DEEPSEEK_API_KEY（https://platform.deepseek.com）
pip install -r requirements.txt
```

### 2. 运行 Demo

```bash
# 直接传入文字
python3 curate.py "想到可以用 Telegram bot 做手机发任务，本机 Agent 消费队列"

# 从标准输入
pbpaste | python3 curate.py

# 保存到本地 inbox（.private/inbox/，不入库）
python3 curate.py -f my-notes.txt --save
```

### 3. Cursor / Codex Skill

安装后可在 IDE 中说：

```text
$inspiration-curator 今天听到播客讲 context 三层，想写成 essay
```

Agent 会按 [`references/system-prompt.md`](references/system-prompt.md) 整理；也可本地跑 `curate.py` 验证。

## 安装

### Cursor

```bash
mkdir -p ~/.cursor/skills/inspiration-curator/{references,prompts}
cp agents/inspiration-curator/SKILL.md ~/.cursor/skills/inspiration-curator/
cp agents/inspiration-curator/references/* ~/.cursor/skills/inspiration-curator/references/
cp agents/inspiration-curator/prompts/* ~/.cursor/skills/inspiration-curator/prompts/
```

### Codex

```bash
mkdir -p ~/.agents/skills/inspiration-curator/{agents,references,prompts}
cp agents/inspiration-curator/SKILL.md ~/.agents/skills/inspiration-curator/
cp agents/inspiration-curator/agents/openai.yaml ~/.agents/skills/inspiration-curator/agents/
cp agents/inspiration-curator/references/* ~/.agents/skills/inspiration-curator/references/
```

## 输出格式

见 [`references/output-schema.md`](references/output-schema.md)。典型结构：

```markdown
## 核心灵感
## 主题与标签
## 类型判断
## 澄清问题
## 建议下一步
## 结构化摘要
```

## 局限

- 需联网与有效 DeepSeek API Key；产生 API 费用
- 不自动写入 git 跟踪目录；`--save` 仅写 `.private/inbox/`
- 不做事实核查；`status: exploring` 内容需人工审定后再发布

## 关联

- [国产大模型接入说明](../../cognition/01-domestic-llm-integration.md)
- [Agent 编写 Checklist](../../playbooks/agent-authoring-checklist.md)
- [AI 认知地图](../../cognition/00-ai-cognition-map.md)
