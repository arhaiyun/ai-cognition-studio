---
title: Skill 三端同步安装
date: 2026-06-13
status: stable
type: playbook
audience: [self, dev]
tags: [skill, cursor, codex, claude-code, ai-cognition-studio]
summary: 每次新建或安装 Cursor Skill 时，同步安装到 Codex，并以 ai-cognition-studio/labs/ 为源码仓库管理。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 5
  week: 2026-W23
  slot: handbook
---

# Skill 三端同步安装 Checklist

> **原则**：Cursor Skill 不是「装完 Cursor 就结束」。源码进 `ai-cognition-studio`，运行副本分别进 Cursor 与 Codex。

## 何时执行

- [ ] 新建 Skill
- [ ] 从外部复制/安装 Skill 到 `~/.cursor/skills/`
- [ ] 修改已有 Skill 且需长期维护

## 三端路径对照

| 角色 | 路径 | 说明 |
|------|------|------|
| **源码（Git 管理）** | `ai-cognition-studio/labs/<skill-name>/` | 唯一真相源，含 README + SKILL.md + references/ |
| **Cursor 运行副本** | `~/.cursor/skills/<skill-name>/` | Cursor Agent 加载 |
| **Codex 运行副本** | `~/.agents/skills/<skill-name>/` | Codex `$skill-name` 加载 |

项目级（可选，跟仓库走）：

| 工具 | 项目级路径 |
|------|-----------|
| Cursor | `.cursor/skills/<skill-name>/` |
| Codex | `.agents/skills/<skill-name>/` |

## 标准目录结构（labs 内）

```
labs/<skill-name>/
├── README.md              # front matter + TL;DR + 三端安装命令
├── SKILL.md               # 主 skill（双平台兼容写法）
├── agents/
│   └── openai.yaml        # Codex 专用：display_name、allow_implicit_invocation
└── references/            # 可选，大 workflow 分包
```

## 安装步骤（每次必做）

### 1. 写入 ai-cognition-studio

```bash
cd ~/github/ai-cognition-studio
mkdir -p labs/<skill-name>/{references,agents}
# 编辑 README.md、SKILL.md、references/*、agents/openai.yaml
```

更新索引：

- [ ] `labs/README.md` 表格加一行
- [ ] 根 `README.md` Labs 导航加一行

### 2. 同步到 Cursor

```bash
mkdir -p ~/.cursor/skills/<skill-name>/references
cp labs/<skill-name>/SKILL.md ~/.cursor/skills/<skill-name>/
cp labs/<skill-name>/references/*.md ~/.cursor/skills/<skill-name>/references/ 2>/dev/null || true
```

### 3. 同步到 Codex

```bash
mkdir -p ~/.agents/skills/<skill-name>/{references,agents}
cp labs/<skill-name>/SKILL.md ~/.agents/skills/<skill-name>/
cp labs/<skill-name>/references/*.md ~/.agents/skills/<skill-name>/references/ 2>/dev/null || true
cp labs/<skill-name>/agents/openai.yaml ~/.agents/skills/<skill-name>/agents/
```

重启 Codex 使 skill 列表刷新。

## SKILL.md 双平台兼容要点

| 能力 | Claude Code | Codex |
|------|-------------|-------|
| 手动触发 | `disable-model-invocation: true` | `agents/openai.yaml` → `allow_implicit_invocation: false` |
| 调用 | `/skill-name 参数` | `$skill-name 参数` |
| 用户提问 | `AskUserQuestion` | 对话中列结构化问题 |
| 参数占位 | `$ARGUMENTS` | 调用时 `$skill-name` 后面的文字 |

`SKILL.md` 正文里写清双平台差异，不要只写 Claude Code 专用语法。

## Codex openai.yaml 模板

```yaml
interface:
  display_name: "<中文短名>"
  short_description: "<一句话>"
  default_prompt: "Use $<skill-name> to ..."

policy:
  allow_implicit_invocation: false
```

## 验收

- [ ] `ai-cognition-studio/labs/<skill-name>/README.md` 可独立阅读
- [ ] Cursor 新对话说触发语 / 显式 @skill 能加载
- [ ] Codex 输入 `$` 能搜到 skill，或 `$skill-name` 能启动
- [ ] 三端文件内容一致（以 labs 为准）

## 一键同步脚本（可选）

在 `ai-cognition-studio` 根目录可维护：

```bash
./scripts/sync-skill.sh <skill-name>
```

见 [scripts/sync-skill.sh](../scripts/sync-skill.sh)。

## 反模式

- ❌ 只装 `~/.cursor/skills/` 不入库 → 换机器丢失
- ❌ 只入库不同步 Codex → 两工具行为不一致
- ❌ Codex 缺 `openai.yaml` → 可能被误触发或 UI 无显示名
- ❌ SKILL.md 只写 Claude Code 语法 → Codex 跑不通

## 延伸阅读

- [skill-authoring-checklist.md](skill-authoring-checklist.md)
- [labs/project-incubator/](../labs/project-incubator/) — 完整示例
- [Codex Skills 文档](https://developers.openai.com/codex/skills)
