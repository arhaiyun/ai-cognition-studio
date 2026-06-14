---
name: inspiration-curator
description: >-
  Curates and structures daily inspiration, scattered ideas, and voice-note style input.
  Use when the user shares 灵感、想法、随手记、brain dump、选题、或 asks to organize messy notes
  into cognition/essay/lab tasks. Can run tools/curate.py with DeepSeek API or follow references/
  manually. Triggers include $inspiration-curator and phrases like "整理一下这个想法".
---

# Inspiration Curator

理解零散日常灵感，输出结构化整理，对齐本仓库目录体系。

## When to use

- 用户输入一段或多段**未整理**的想法、灵感、听后感草稿
- 用户说「整理灵感 / 帮我归类 / 这能写成什么」
- 用户要从 brain dump 决定放进 `cognition/`、`essays/`、`.private/drafts/` 或 `agents/`

## Workflow

1. **读取输入** — 用户消息、粘贴文本，或建议运行：
   ```bash
   python3 agents/inspiration-curator/tools/curate.py "<用户原文>"
   ```
2. **应用规则** — 严格遵循 [`references/system-prompt.md`](references/system-prompt.md)
3. **输出** — 按 [`references/output-schema.md`](references/output-schema.md) 的 Markdown 结构回复
4. **建议归档** — 给出推荐路径与 front matter 草稿（title / tags / summary）
5. **可选保存** — 若用户同意且在本仓库内，写入 `.private/inbox/YYYY-MM-DD-<slug>.md`（勿 commit）

## Constraints

- 不捏造用户未表达的观点；不确定处列入「澄清问题」
- 不自动 commit 或写入公开目录
- API Key 仅从 `agents/inspiration-curator/tools/.env` 或环境变量读取，勿写入对话或 SKILL

## References

- `references/system-prompt.md` — DeepSeek / 手动整理共用系统提示
- `references/output-schema.md` — 输出字段说明
- `prompts/examples.md` — 输入输出示例
