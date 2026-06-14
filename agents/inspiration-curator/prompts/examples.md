# 示例

## 输入

```text
今天听到播客说 AI 应该当副驾不是自动驾驶，想到我风控平台那边也可以做一个
「人工确认节点」的 checklist，另外 Telegram 发任务那个还没做
```

## 输出要点（节选）

- **核心灵感**：副驾模型 + 风控人工确认节点 + 与 IM 任务队列的关联
- **类型**：`cognition` + `playbook` + `task`
- **推荐归档**：
  - 认知延伸 → `essays/` 或更新 `cognition/00-ai-cognition-map.md`
  - checklist → `playbooks/risk-human-review-checklist.md`（若在 risk 仓库则注明跨项目）
  - IM 任务 → `agents/` 新 Sub-Agent 或 `.private/drafts/im-gateway.md`
- **澄清**：风控 checklist 放在本仓库还是 risk-platform？

---

## 输入

```text
MCP 读知识库
```

## 输出要点

- **核心灵感**：通过 MCP 暴露 cognition studio 内容供 Cursor 检索
- **类型**：`lab` / `agent`，confidence: medium
- **澄清**：只读检索还是也要写入 inbox？
- **下一步**：参考 `labs/mcp-hello` 新建 `labs/studio-content-mcp/`
