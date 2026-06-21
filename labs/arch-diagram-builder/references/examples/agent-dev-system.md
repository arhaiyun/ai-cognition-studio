# 范例：AI Agent 开发系统架构

成品 HTML：`docs/diagrams/ai-agent-dev-system.html`

## 图表主题

AI Agent 开发系统架构

## 架构说明

现代 Agent 系统以 **Agent Runtime** 为核心，执行 Plan-Act-Observe 循环：拉取 Context、调用 LLM 推理、经 Tool Router 执行外部工具，Memory 持久化状态，Observability 全链路采集，最终经 API 返回响应。

## 节点列表

| 节点 id | 名称 | 语义 | 颜色 | 位置 |
|---------|------|------|------|------|
| user | 用户 / App | 入口 | B | 顶部中央 |
| api | API Gateway | REST/WebSocket | B | 上中 |
| response | 响应输出 | 最终响应 | B | 右上 |
| context | Context Engine | RAG/Profile/Workspace | G | 中层左 |
| runtime | Agent Runtime | Plan-Act-Observe | P | 中层中央 |
| llm | LLM Provider | 推理 | P | 中层右 |
| tools | Tool Router | MCP/API 路由 | O | 下左 |
| external | MCP / APIs | 外部工具 | O | 最下左 |
| memory | Memory Store | 长期/会话记忆 | G | 下中 |
| observe | Observability | Trace/Eval/Log | C | 下右 |

## Chip

- context: RAG, Profile, Workspace
- runtime: Plan, Act, Observe
- tools: MCP, API
- observe: Trace, Eval, Log/Metrics

## 分区

- INTELLIGENCE LAYER（紫 tint）：context, runtime, llm
- EXECUTION LAYER（橙 tint）：tools, external
- OBSERVABILITY（青 tint）：observe

## 连接关系

| id | 流向 | 语义 |
|----|------|------|
| conn-user-api | user→api | 请求 |
| conn-api-runtime | api→runtime | 路由 |
| conn-context-runtime | context→runtime | 上下文注入 |
| conn-runtime-llm | runtime→llm | 推理请求 |
| conn-llm-runtime | llm→runtime | 计划/动作 |
| conn-runtime-tools | runtime→tools | 工具调用 |
| conn-tools-external | tools→external | 执行 |
| conn-external-tools | external→tools | 结果 |
| conn-tools-runtime | tools→runtime | 执行结果 |
| conn-runtime-memory | runtime→memory | 状态持久化 |
| conn-memory-context | memory→context | 记忆召回 |
| conn-runtime-observe | runtime→observe | Trace 上报 |
| conn-runtime-response | runtime→response | 最终响应 |
| conn-response-api | response→api | 返回 |

## 演示步骤（8 步）

1. **用户发起请求** — nodes: user, api — conn-user-api — particles: user-api
2. **路由至 Runtime** — api, runtime — conn-api-runtime — api-runtime
3. **加载上下文** — context, runtime — conn-context-runtime — chips: rag, profile, ws — context-runtime
4. **LLM 推理** — runtime, llm — conn-runtime-llm, conn-llm-runtime — chip-plan — runtime-llm, llm-runtime
5. **调用工具** — runtime, tools, external — runtime-tools, tools-external, external-tools — chip-act, mcp, api
6. **观察结果** — runtime, tools — conn-tools-runtime — chip-observe — tools-runtime
7. **持久化与观测** — memory, observe, runtime — memory/context/observe 三条 — chips trace/eval/log
8. **返回响应** — runtime, response, api, user — runtime-response, response-api, user-api — runtime-response

## 标题

- 主标题：AI Agent 开发系统架构
- badge：Architecture Overview
