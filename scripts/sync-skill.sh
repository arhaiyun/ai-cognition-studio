#!/usr/bin/env bash
# 从 ai-cognition-studio/labs/<skill-name> 同步到 Cursor 与 Codex 本机目录
set -euo pipefail

SKILL_NAME="${1:?用法: ./scripts/sync-skill.sh <skill-name>}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LAB="$REPO_ROOT/labs/$SKILL_NAME"

if [[ ! -f "$LAB/SKILL.md" ]]; then
  echo "错误: 找不到 $LAB/SKILL.md" >&2
  exit 1
fi

echo "→ 同步 $SKILL_NAME 到 Cursor (~/.cursor/skills/)"
mkdir -p "$HOME/.cursor/skills/$SKILL_NAME/references"
cp "$LAB/SKILL.md" "$HOME/.cursor/skills/$SKILL_NAME/"
if compgen -G "$LAB/references/*.md" > /dev/null; then
  cp "$LAB/references/"*.md "$HOME/.cursor/skills/$SKILL_NAME/references/"
fi

echo "→ 同步 $SKILL_NAME 到 Codex (~/.agents/skills/)"
mkdir -p "$HOME/.agents/skills/$SKILL_NAME"/{references,agents}
cp "$LAB/SKILL.md" "$HOME/.agents/skills/$SKILL_NAME/"
if compgen -G "$LAB/references/*.md" > /dev/null; then
  cp "$LAB/references/"*.md "$HOME/.agents/skills/$SKILL_NAME/references/"
fi
if [[ -f "$LAB/agents/openai.yaml" ]]; then
  cp "$LAB/agents/openai.yaml" "$HOME/.agents/skills/$SKILL_NAME/agents/"
else
  echo "  警告: 缺少 agents/openai.yaml，建议为 Codex 补上" >&2
fi

if [[ -d "$LAB/scripts" ]]; then
  echo "→ 同步 scripts/"
  mkdir -p "$HOME/.cursor/skills/$SKILL_NAME/scripts"
  cp -R "$LAB/scripts/." "$HOME/.cursor/skills/$SKILL_NAME/scripts/"
  mkdir -p "$HOME/.agents/skills/$SKILL_NAME/scripts"
  cp -R "$LAB/scripts/." "$HOME/.agents/skills/$SKILL_NAME/scripts/"
fi

echo "✓ 完成。Codex 需重启后 skill 列表才会刷新。"
