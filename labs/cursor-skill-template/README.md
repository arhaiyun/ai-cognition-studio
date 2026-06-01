# cursor-skill-template

Cursor Agent **Skill 模板** — 复制 `SKILL.md` 到你的 skill 目录或 `.cursor/skills/` 后修改。

## 使用

1. 复制本目录 `SKILL.md` 到目标位置
2. 修改 `name`（小写连字符）与 `description`（含触发场景）
3. 按 [playbooks/skill-authoring-checklist.md](../../playbooks/skill-authoring-checklist.md) 验收

## 文件

| 文件 | 说明 |
|------|------|
| `SKILL.md` | 带 front matter 的完整模板 |

## 与 Rules 的区别

| | Rules | Skills |
|---|--------|--------|
| 加载 | 常时 / 按 glob | 按任务触发 |
| 内容 | 规范、风格 | 工作流、领域步骤 |

## 局限

模板不含 eval 脚本；复杂 skill 可另建 `reference/` 子目录。
