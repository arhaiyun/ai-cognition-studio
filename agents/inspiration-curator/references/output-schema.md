# 输出 Schema

Agent 与 `curate.py` 均按此 Markdown 结构输出。

```markdown
# 灵感整理 · {简短标题}

> 整理时间：{ISO 日期} · 置信度：{high|medium|low}

## 核心灵感

（1～2 句话，用户意图的精炼表述）

## 主题与标签

- **主题**：
- **tags**：[tag1, tag2, ...]

## 类型判断

| 主类型 | 说明 |
|--------|------|
| essay | … |

## 澄清问题

1. （若无则写「无」）

## 建议下一步

- [ ] 具体可执行步骤
- **推荐归档**：`path/to/dir/` — 理由
- **front matter 草稿**（若适合成文）：

\`\`\`yaml
title: ""
date: YYYY-MM-DD
status: exploring
tags: []
summary: ""
\`\`\`

## 结构化摘要

（3～5 条 bullet，便于未来检索）

---

## 原文

（保留用户原始输入，便于对照）
```
