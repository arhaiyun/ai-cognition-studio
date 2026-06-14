---
title: feishu-doc-writer · 飞书文档写入 Skill
date: 2026-06-14
status: stable
audience: [self, dev]
tags: [skill, feishu, lark, docs, wiki]
summary: Codex/Cursor Skill：把 Markdown 内容写入指定飞书 Wiki 父节点下的新子文档。
---

# feishu-doc-writer

把 Markdown 文档写入飞书知识库，默认创建到：

```text
https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf
```

## TL;DR

```bash
node ~/.agents/skills/feishu-doc-writer/scripts/write-feishu-doc.mjs \
  --title "文档标题" \
  --content-file /absolute/path/to/doc.md
```

## 配置

凭证不入库。脚本读取：

- 环境变量
- `~/.config/feishu-doc-writer/.env`
- `--env-file /path/to/.env`

需要：

```text
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
```

可选：

```text
FEISHU_PARENT_WIKI_URL=https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf
```

## 安装

从 `ai-cognition-studio` 根目录同步：

```bash
./scripts/sync-skill.sh feishu-doc-writer
```

## 验证

```bash
node ~/.agents/skills/feishu-doc-writer/scripts/write-feishu-doc.mjs \
  --title "Feishu smoke test" \
  --content-file /absolute/path/to/test.md \
  --dry-run
```

去掉 `--dry-run` 后会真实创建飞书 Wiki 子文档。
