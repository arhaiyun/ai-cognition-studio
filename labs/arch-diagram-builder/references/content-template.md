# 内容描述模板（每次只填这部分）

将下方「内容描述」填好后交给 `arch-diagram-builder` 生成 HTML。设计系统部分无需重复填写。

---

## 图表主题

[例如：RAG Pipeline 架构 / Multi-Agent 系统 / MCP 协议原理]

## 架构说明

[2–3 句话描述核心 runtime 逻辑，帮助 AI 理解语义]

## 节点列表

| 节点名称 | 语义 | 颜色 B/P/G/O/C | 所在位置 |
|---------|------|----------------|---------|
| [名称] | [代表什么] | [B] | [上/中/下/左/右] |

## 连接关系

- [节点A] → [节点B]：[数据/控制流说明]
- [节点B] ↔ [节点C]：[双向关系说明，注明去程/回程语义]

## 子组件（Chip）

- [节点A] 内部：[chip1, chip2, chip3]
- [节点B] 内部：[chip1, chip2]

## 演示步骤（6~9 步）

1. **[第1步标题]**：激活 [nodes]，连线 [conns]，粒子 [particles]，Chip [chips]
2. **[第2步]**：…
3. …

## 顶部标题

[图表主标题]

## 副标题 badge

[右上角小标签，如 Architecture Overview]

---

## 填写示例（RAG Pipeline）

**图表主题**：RAG Pipeline 架构

**架构说明**：RAG 在 LLM 推理前注入外部知识，核心是 Retrieval + Generation 两阶段协作。

**节点**：用户问题(蓝/顶)、Retriever(绿/左)、Vector DB(绿/最左)、LLM(紫/中)、Reranker(橙/右)、回答输出(蓝/底)

**步骤**：

1. 用户提问 → Retriever
2. Retriever 查询 Vector DB，Top-K 召回
3. Reranker 重排序
4. 文档 + 问题 → LLM 生成
5. LLM 输出最终回答

**标题**：RAG Pipeline 架构 · **badge**：Retrieval Augmented Generation
