---
title: studio-skill-sync · Skill 三端同步
date: 2026-06-13
status: stable
audience: [self, dev]
tags: [skill, cursor, codex, meta]
summary: 强制流程：新建/安装 Cursor Skill 时同步 Codex 并入库 ai-cognition-studio/labs/。
---

# studio-skill-sync

Meta Skill：确保每次 Skill 安装都走 **三端同步**（源码 → Cursor → Codex）。

## TL;DR

用户要装/写 Skill 时，Agent 应自动读取本 skill，并执行 [playbooks/skill-dual-install.md](../../playbooks/skill-dual-install.md)。

## 同步命令

```bash
cd ~/github/ai-cognition-studio
./scripts/sync-skill.sh <skill-name>
```

## 文件

| 文件 | 说明 |
|------|------|
| `SKILL.md` | Cursor Agent 触发用 |
| `agents/openai.yaml` | Codex 侧配置 |

## 延伸阅读

- [playbooks/skill-dual-install.md](../../playbooks/skill-dual-install.md)
- [playbooks/skill-authoring-checklist.md](../../playbooks/skill-authoring-checklist.md)
