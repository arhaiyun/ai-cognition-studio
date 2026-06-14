---
name: feishu-doc-writer
description: Write Markdown documents into Feishu/Lark Docs under a configured Wiki parent. Use when the user asks to write, publish, sync, save, create, or upload documentation to Feishu, Lark, 飞书文档, 飞书知识库, or a Feishu Wiki URL; especially when the target parent is https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf.
---

# Feishu Doc Writer

Use this skill to create a new Feishu Wiki child document from Markdown.

Default parent Wiki:

```text
https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf
```

## Workflow

1. Determine the document title.
   - Use the user's explicit title if provided.
   - Otherwise generate a concise title from the task topic.
2. Prepare the document body as Markdown.
   - Prefer a local temporary `.md` file when the content is more than a few paragraphs.
   - Keep sensitive tokens, secrets, private keys, and credentials out of the document.
3. Run the bundled script:

```bash
node ~/.agents/skills/feishu-doc-writer/scripts/write-feishu-doc.mjs \
  --title "Document title" \
  --content-file /absolute/path/to/content.md
```

4. Report the created Feishu URL to the user.

## Configuration

The script reads Feishu credentials from these sources, later values overriding earlier values:

1. process environment
2. `~/.config/feishu-doc-writer/.env`
3. explicit `--env-file /path/to/.env`

Required keys:

```text
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
```

Optional keys:

```text
FEISHU_PARENT_WIKI_URL=https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf
```

If no parent is provided, the script uses the default parent above.

Never print `FEISHU_APP_SECRET` or other credential values.

## Script Options

```text
--title <title>          Required document title.
--content-file <path>    Required Markdown file to write.
--parent-url <url>       Optional Feishu Wiki parent URL.
--env-file <path>        Optional dotenv file with Feishu credentials.
--dry-run                Validate inputs and show planned write without calling Feishu.
```

## Validation

Before the first live write in a new environment, run a dry run:

```bash
node ~/.agents/skills/feishu-doc-writer/scripts/write-feishu-doc.mjs \
  --title "Feishu smoke test" \
  --content-file /absolute/path/to/test.md \
  --dry-run
```

Then run without `--dry-run` to create the child document.

## Platform Notes

Claude Code users can call this as `/feishu-doc-writer <request>`.

Codex users can call this as `$feishu-doc-writer <request>` or rely on implicit triggering for Feishu/Lark document publishing requests.
