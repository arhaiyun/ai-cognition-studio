---
name: studio-skill-sync
description: >-
  Enforces three-way skill sync when creating or installing Cursor Agent Skills.
  Use whenever the user asks to create, install, copy, update, or write a SKILL.md,
  Cursor skill, agent skill, or mentions ~/.cursor/skills — even if they only say
  "install this skill" or "make a skill for X". Always sync to Codex (~/.agents/skills/)
  and commit source to ai-cognition-studio/labs/ before considering the task done.
---

# Studio Skill Sync

When the user creates or installs any Cursor Skill, complete **all three** steps:

## 1. Source of truth → ai-cognition-studio

```
~/github/ai-cognition-studio/labs/<skill-name>/
├── README.md
├── SKILL.md
├── agents/openai.yaml    # required for Codex
└── references/           # optional
```

Update `labs/README.md` and root `README.md`.

## 2. Cursor runtime

```
~/.cursor/skills/<skill-name>/
```

## 3. Codex runtime

```
~/.agents/skills/<skill-name>/
```

Include `agents/openai.yaml` with `allow_implicit_invocation: false` for manual-only workflows.

## Sync command

```bash
cd ~/github/ai-cognition-studio && ./scripts/sync-skill.sh <skill-name>
```

## Dual-platform SKILL.md

- Claude Code: `/skill-name`, `$ARGUMENTS`, `AskUserQuestion`, `disable-model-invocation`
- Codex: `$skill-name`, text after invocation, chat questions, `agents/openai.yaml`

Document both in SKILL.md body.

## Reference

Full checklist: `~/github/ai-cognition-studio/playbooks/skill-dual-install.md`

Example lab: `~/github/ai-cognition-studio/labs/project-incubator/`
