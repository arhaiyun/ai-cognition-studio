# 贡献与写作规范

> 本仓库主要是个人学习沉淀；本文档给「未来的我」和 occasional contributor 用。

## 内容分类

| 类型 | 目录 | 要求 |
|------|------|------|
| 认知框架 | `cognition/` | 相对稳定、可索引；大改用 PR 或修订记录 |
| 长文/笔记 | `essays/` | 单篇独立文件，带 front matter |
| 播客 | `podcast/` | 外链 + 3 条 takeaway，不存音频 |
| Mini 项目 | `labs/*/` | 必须可运行或有明确 TODO 与运行步骤 |
| Sub-Agent | `agents/*/` | README + SKILL.md + agents/openai.yaml；登记 registry.yaml |
| Checklist | `playbooks/` | 可打印、可勾选 |

## Markdown Front Matter（统一 schema）

所有编入 Studio 索引的 Markdown 使用同一 front matter。`type` 通常可省略（由目录自动推断）。

| 目录 | 默认 `type` |
|------|-------------|
| `cognition/`、`essays/` | `article` |
| `podcast/` | `podcast-card` |
| `playbooks/` | `playbook` |
| `meta/` | `meta` |
| `labs/*/README.md` | `lab` |
| `agents/` 模块 README、`agents/*/README.md` | `agent` |

### 通用字段

```yaml
---
title: ""
date: YYYY-MM-DD
status: exploring   # exploring | stable | archived（draft 请放 .private/）
type: article       # 可选，覆盖目录默认值
audience: [self, dev, general]
tags: []
summary: ""
---
```

`status` 说明：`exploring` 探索中 · `stable` 相对稳定 · `archived` 归档保留。

### 播客卡片额外字段（`podcast/`）

见 [`podcast/_template.md`](podcast/_template.md)：`hosts`、`guests`、`links`、`takeaways`、`related` 等。

## Lab 最低标准

每个 `labs/<name>/` 必须包含：

1. `README.md` — 问题、步骤、学到什么、局限
2. 依赖文件（`requirements.txt` / `package.json` 等）
3. 不含真实密钥（用 `.env.example`）

## 草稿流程

1. 在本地 `.private/drafts/` 写作
2. 定稿后迁入公开目录
3. **禁止** commit `.private/` 内容

## 语言与风格

- 中文为主，术语保留英文（MCP、Skill、RAG）
- 每篇开头 **TL;DR**；文末 **延伸阅读** 或 **关联 lab**
- 不确定处标注 `status: exploring`

## GitHub Project

建议用 Labels：`cognition` `essay` `podcast` `lab` `mcp` `skill` `playbook`

Project 列：Backlog → 阅读/收听中 → 写作中 → Lab 开发中 → 已发布 → 技巧库
