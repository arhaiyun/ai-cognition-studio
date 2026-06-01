---
name: example-skill
description: Example Cursor Agent Skill template for ai-cognition-studio. Use when the user asks to create or review a SKILL.md, skill structure, or skill description wording for Cursor.
---

# Example Skill Template

本文件是 **Skill 结构模板**，复制后改 `name`、`description` 与正文。

## Overview

（2–4 句：这个 skill 解决什么问题、产出什么。）

## When to use

- 用户说：「帮我写一个 skill」
- 用户说：「review 一下 SKILL.md」

## Process

### 1. 明确触发与边界

- 写 **description**（第三人称，含触发关键词）
- 确认不应与 `.cursor/rules` 或别的 skill 重复

### 2. 写 SKILL.md

必需 front matter：

```yaml
---
name: your-skill-name
description: ...
---
```

### 3. 验收

- 新对话用触发语测试
- 按 [playbooks/skill-authoring-checklist.md](../../playbooks/skill-authoring-checklist.md) 过一遍

## Anti-patterns

- 不要把整 repo 规范塞进 skill
- description 过宽导致误触发

## References

- [playbooks/skill-authoring-checklist.md](../../playbooks/skill-authoring-checklist.md)
- [Cursor Skills 文档](https://cursor.com/docs/context/skills)
