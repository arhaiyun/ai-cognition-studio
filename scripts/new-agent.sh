#!/usr/bin/env bash
# 从 _template 脚手架创建新的 Sub-Agent
# 用法: ./scripts/new-agent.sh <agent-id> [display-name]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT/agents/_template"
REGISTRY="$ROOT/agents/registry.yaml"

if [[ $# -lt 1 ]]; then
  echo "用法: $0 <agent-id> [display-name]" >&2
  echo "示例: $0 risk-reviewer \"风控审查 Agent\"" >&2
  exit 1
fi

AGENT_ID="$1"
DISPLAY_NAME="${2:-$AGENT_ID}"
TARGET="$ROOT/agents/$AGENT_ID"

if [[ ! "$AGENT_ID" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "错误: agent-id 须为 kebab-case（如 risk-reviewer）" >&2
  exit 1
fi

if [[ -e "$TARGET" ]]; then
  echo "错误: 已存在 $TARGET" >&2
  exit 1
fi

if [[ ! -d "$TEMPLATE" ]]; then
  echo "错误: 缺少模板 $TEMPLATE" >&2
  exit 1
fi

cp -R "$TEMPLATE" "$TARGET"
rm -f "$TARGET/README.md"

TODAY="$(date +%Y-%m-%d)"
cat > "$TARGET/README.md" <<EOF
---
title: "${DISPLAY_NAME}"
date: ${TODAY}
status: exploring
audience: [self, dev]
tags: [agent]
summary: TODO — 一句话说明 Sub-Agent 职责。
---

# ${DISPLAY_NAME}

> **TL;DR**：TODO

## 职责

（单点职责，避免万能 Agent）

## 触发

- \`$${AGENT_ID} …\`
- 用户提到 …

## 安装

### Cursor

\`\`\`bash
mkdir -p ~/.cursor/skills/${AGENT_ID}
cp agents/${AGENT_ID}/SKILL.md ~/.cursor/skills/${AGENT_ID}/
\`\`\`

### Codex

\`\`\`bash
mkdir -p ~/.agents/skills/${AGENT_ID}/agents
cp agents/${AGENT_ID}/SKILL.md ~/.agents/skills/${AGENT_ID}/
cp agents/${AGENT_ID}/agents/openai.yaml ~/.agents/skills/${AGENT_ID}/agents/
\`\`\`

## 局限

- TODO
EOF

# 替换 SKILL.md / openai.yaml 占位符
if [[ "$(uname)" == "Darwin" ]]; then
  sed -i '' "s/AGENT_ID/${AGENT_ID}/g" "$TARGET/SKILL.md" "$TARGET/agents/openai.yaml"
  sed -i '' "s/AGENT_DISPLAY_NAME/${DISPLAY_NAME}/g" "$TARGET/SKILL.md" "$TARGET/agents/openai.yaml"
else
  sed -i "s/AGENT_ID/${AGENT_ID}/g" "$TARGET/SKILL.md" "$TARGET/agents/openai.yaml"
  sed -i "s/AGENT_DISPLAY_NAME/${DISPLAY_NAME}/g" "$TARGET/SKILL.md" "$TARGET/agents/openai.yaml"
fi

# 追加 registry（简单 YAML 列表）
if grep -q "id: ${AGENT_ID}" "$REGISTRY" 2>/dev/null; then
  echo "警告: registry 中已有 ${AGENT_ID}" >&2
else
  cat >> "$REGISTRY" <<EOF
  - id: ${AGENT_ID}
    name: "${DISPLAY_NAME}"
    path: agents/${AGENT_ID}
    status: exploring
    triggers: ["\$${AGENT_ID}"]
    depends_on: []
    summary: "TODO"
EOF
fi

mkdir -p "$TARGET/references" "$TARGET/prompts" "$TARGET/tools"
echo "# ${DISPLAY_NAME} · 参考文档" > "$TARGET/references/.gitkeep"
echo "# ${DISPLAY_NAME} · Prompt 片段" > "$TARGET/prompts/.gitkeep"

echo "✓ 已创建 agents/${AGENT_ID}/"
echo "  下一步: 编辑 SKILL.md、README.md，并在 studio 中 npm run content:build 刷新索引"
