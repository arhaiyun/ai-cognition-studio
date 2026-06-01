# mcp-hello · 最小 MCP Server

Python [FastMCP](https://github.com/modelcontextprotocol/python-sdk) + **stdio** 传输，供 Cursor / Claude Desktop 连接测试。

## 学到什么

- MCP tool 的最小定义（`@mcp.tool()`）
- stdio 模式下如何本地启动
- Cursor 里如何配置 `mcp.json`

## 环境

- Python 3.10+
- 虚拟环境推荐

## 运行

```bash
cd labs/mcp-hello
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

stdio 模式下进程会等待 stdin；**正常由 MCP 客户端拉起**，不必长期手动运行。

## Cursor 配置

在项目或用户目录 `.cursor/mcp.json` 中添加（路径按本机修改）：

```json
{
  "mcpServers": {
    "ai-cognition-hello": {
      "command": "/absolute/path/to/ai-cognition-studio/labs/mcp-hello/.venv/bin/python",
      "args": ["/absolute/path/to/ai-cognition-studio/labs/mcp-hello/server.py"]
    }
  }
}
```

重启 Cursor 后，Agent 应能调用 `echo` 与 `utc_now`。

## 工具列表

| 工具 | 说明 |
|------|------|
| `echo` | 回显字符串 |
| `utc_now` | 返回 UTC 时间 |

## 局限

- 无鉴权、无持久化 — 仅学习用
- 未部署 HTTP 传输 — 需要时再扩 [playbooks/mcp-design-checklist.md](../../playbooks/mcp-design-checklist.md)

## 下一步

- 加一个读本地文件的 tool（注意路径沙箱）
- 或对接一个只读公开 API
