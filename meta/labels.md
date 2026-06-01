# GitHub Labels 说明

与 Issues / Project 对齐，便于筛选。

| Label | 用途 |
|-------|------|
| `cognition` | 认知框架（`cognition/`） |
| `essay` | 长文与笔记（`essays/`） |
| `podcast` | 播客卡片 |
| `lab` | Mini 项目 |
| `mcp` | MCP 相关 |
| `skill` | Cursor / Agent Skill |
| `playbook` | Checklist 与流程 |
| `draft` | 进行中，未发布 |
| `good-first-issue` | 小任务，适合快速闭环 |

## Project 列建议

1. **Backlog** — 选题池
2. **阅读/收听中** — 输入
3. **写作中** — 对应 `.private/drafts`
4. **Lab 开发中**
5. **已发布**
6. **技巧库** — playbook 维护

## 创建 Labels（GitHub Web）

Settings → Labels → New label

或使用 gh（安装后）：

```bash
gh label create cognition --color "1D76DB" --description "认知框架"
gh label create essay --color "5319E7" --description "长文与笔记"
gh label create podcast --color "FBCA04" --description "播客索引"
gh label create lab --color "0E8A16" --description "Mini 项目"
gh label create mcp --color "006B75" --description "MCP"
gh label create skill --color "B60205" --description "Skill"
gh label create playbook --color "D4C5F9" --description "Checklist"
```

## 建议首批 Issues

1. `[lab] mcp-hello：最小 MCP Server 跑通 + README`
2. `[essay] AI 认知地图 v0.1 扩写：幻觉与校准`
3. `[playbook] Skill 编写 checklist 扩写`
4. `[podcast] 建立首条播客卡片`
5. `[cognition] Context 设计：rules / skills / MCP 分工`
