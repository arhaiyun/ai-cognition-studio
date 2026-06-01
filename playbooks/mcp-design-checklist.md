# MCP 设计 Checklist

> 新建或评审 MCP Server 时逐项过一遍。详细 lab 见 [labs/mcp-hello/](../labs/mcp-hello/)。

## 规划

- [ ] **场景明确**：Agent 要完成什么任务？缺 MCP 时卡在哪一步？
- [ ] **API 覆盖 vs 工作流工具**：优先广覆盖还是封装高频流程？（不确定时偏 API 覆盖）
- [ ] **命名一致**：工具名带前缀，动作清晰（如 `github_list_repos`）
- [ ] **分页与过滤**：返回体可控，避免一次塞满 context

## 实现

- [ ] **传输选型**：本地用 stdio；远程用 Streamable HTTP（按需）
- [ ] **错误信息可操作**：告诉 Agent 下一步怎么办，而非仅 HTTP 码
- [ ] **鉴权**：密钥走环境变量，提供 `.env.example`
- [ ] **README**：安装、运行、Cursor 配置示例、已知局限

## 安全

- [ ] **最小权限**：只暴露必要工具
- [ ] **无密钥入库**：`.gitignore` 含 `.env`
- [ ] **危险操作**：删除/支付类需显式命名或二次确认设计

## 验收

- [ ] 本地 `python server.py` 或等价命令可启动
- [ ] Cursor / Claude Desktop 能连上并调用至少 1 个 tool
- [ ] 记录 1 条真实使用场景到 lab README

---

## 延伸阅读

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [labs/mcp-hello/README.md](../labs/mcp-hello/README.md)
