#!/usr/bin/env python3
"""最小 MCP Server：echo 与当前时间 — 用于验证 Cursor MCP 连通性。"""

from datetime import datetime, timezone

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ai-cognition-hello")


@mcp.tool()
def echo(message: str) -> str:
    """回显一条消息，用于测试 MCP 工具调用是否正常。"""
    return message


@mcp.tool()
def utc_now() -> str:
    """返回当前 UTC 时间（ISO 8601），用于测试无参工具。"""
    return datetime.now(timezone.utc).isoformat()


if __name__ == "__main__":
    mcp.run()
