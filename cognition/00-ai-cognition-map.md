---
title: AI 认知地图 v0.1
date: 2026-05-24
status: exploring
audience: [self, dev, general]
tags: [cognition, agent, context]
summary: 能力边界、人机分工与 Context 三层结构的占位索引。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 1
  week: 2026-W21
  slot: pillar
---

# AI 认知地图 v0.1

> **TL;DR**：把 AI 当「副驾」而非「自动驾驶」；能力靠 **Context + Tools + 人审** 组合，不是单点模型魔法。

---

## 1. 能力边界

| 擅长 | 谨慎 |
|------|------|
| 结构化写作、代码草稿、模式识别 | 实时事实、未验证数值、不可逆操作 |
| 在明确约束下推理 | 长链路上下文丢失后的「自信胡编」 |

## 2. 人机分工（副驾模型）

```mermaid
flowchart LR
  Human["人：目标 / 风险 / 最终决策"]
  AI["AI：草案 / 检索 / 检查清单"]
  Tools["Tools：MCP / API / 本地脚本"]
  Human --> AI
  AI --> Tools
  Tools --> AI
  AI --> Human
```

## 3. Context 三层（本仓库实践）

| 层 | 载体 | 典型内容 |
|----|------|----------|
| 持久规则 | `.cursor/rules`、AGENTS.md | 风格、安全、仓库约定 |
| 可复用技能 | Skills（`SKILL.md`） | 领域流程、何时触发 |
| 即时工具 | MCP Servers | 查数据、调 API、跑命令 |

## 4. 与本仓库的对应

| 想理解… | 去看… |
|---------|--------|
| AI 产品成熟度与 L3–L6 | [02-ai-product-six-layers.md](02-ai-product-six-layers.md) |
| MCP 怎么设计 | [playbooks/mcp-design-checklist.md](../playbooks/mcp-design-checklist.md) |
| Skill 怎么写 | [labs/cursor-skill-template/](../labs/cursor-skill-template/) |
| 跑通最小 MCP | [labs/mcp-hello/](../labs/mcp-hello/) |
| 国产模型怎么接 | [cognition/01-domestic-llm-integration.md](01-domestic-llm-integration.md) |

---

## 延伸阅读

- [学习路线图](../meta/learning-roadmap.md)
- 待写 essay：幻觉与校准实践

## 修订

| 日期 | 变更 |
|------|------|
| 2026-05-24 | v0.1 占位索引 |
