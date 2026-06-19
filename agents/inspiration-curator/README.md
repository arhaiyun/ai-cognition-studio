---
title: inspiration-curator · 日常灵感整理 Agent
date: 2026-06-19
status: exploring
audience: [self, dev]
tags: [agent, deepseek, inspiration, llm, portfolio]
summary: 用 Prompt、输出 Schema 和人审把零散想法整理成可检索、可归档、可继续执行的内容线索。
portfolio:
  order: 2
  label: Sub-Agent · Content Workflow
  outcome: 把零散输入整理成有主题、有去向、可继续创作的内容线索。
  capabilities: [Sub-Agent, 内容理解, LLM 接入]
---

# Inspiration Curator

> **一句话结论**：模型可以快速整理灵感，但“结构完整”不等于“判断可靠”；可用的工作流必须保留原文、约束输出，并让人明确接受或否决建议。

## 问题背景

日常灵感通常不是一篇文章的缩写，而是混合了观点、任务、项目想法和待澄清假设的碎片。如果直接把它们发布到知识库，会制造大量无法继续行动的内容；如果只放进备忘录，又很难检索、归档和形成后续作品。

Inspiration Curator 的目标不是替用户写成品，而是完成中间整理层：

- 保留原始输入，避免模型重写后丢失真实意图。
- 提炼核心灵感、主题和标签。
- 判断它更像认知、文章、Lab、Agent、Playbook、任务还是待观察项。
- 暴露最多 3 个澄清问题。
- 给出仓库内的归档路径和下一步行动。

## 我的角色

- **工作流设计**：定义“原始灵感 → 结构化草案 → 人工判断 → 归档”的边界。
- **Prompt 与 Schema 设计**：约束模型必须输出核心灵感、分类、澄清问题、建议和原文。
- **LLM 工程接入**：通过统一 profile 调用 OpenAI 兼容的 DeepSeek API。
- **可信度设计**：不把模型结果自动写入公开目录，保存只允许进入 `.private/inbox/`。

## 系统结构

```text
零散输入
  ↓
系统提示：仓库目录、类型定义、禁止事项
  ↓
DeepSeek API：生成结构化 Markdown
  ↓
Schema 检查：确认 7 个必需章节
  ↓
人工评审：接受、修订或否决建议
  ↓
.private/inbox/ 或人工迁入公开目录
```

模型供应商不是这个案例的主角。DeepSeek 是当前验证使用的实现，真正可复用的是 Prompt、Schema、人审和归档边界。

## 一次真实运行

2026 年 6 月 19 日，我用 `deepseek-media-agent` profile 整理了这个问题：

> 如何把 AI Cognition Studio 从学习仓库转变为能证明个人判断、产品设计和工程交付能力的作品集，并形成可持续更新路径？

运行命令：

```bash
python3 agents/inspiration-curator/tools/curate.py \
  --profile deepseek-media-agent \
  "我想把 AI Cognition Studio 从一个以学习笔记、Skills、Agents 和 Labs 为主的 AI 学习仓库..."
```

模型输出完整覆盖了 7 个必需章节，并提出三层证据结构、跨域案例和更新节奏。完整原始输出与评审保存在：

[查看原始运行证据与人工评审](https://github.com/arhaiyun/ai-cognition-studio/blob/main/agents/inspiration-curator/evidence/2026-06-19-portfolio-transformation.md)

## 人工评审

### 有效判断

- 下一步应补可信证据，而不是继续增加工具数量。
- 首页、领域导航和深度案例可以分别承担定位、浏览和证明职责。
- Agent、Lab、Cognition 各补一个案例，能展示不同层面的能力。

### 遗漏

- 没有定义测试、运行日志、截图、失败记录等证据标准。
- 面向雇主与合作方的目标仍然宽泛，模型却没有提出澄清问题。
- 没有评估“每月一篇案例”的维护成本。

### 错误与过度推断

- 把 Studio 首页改造误写成 README 改造。
- 建议新增 `portfolio/` 目录，会与现有 portfolio 元数据和内容路由重复。
- 假设存在适合公开的未发布项目。
- 建议的 `capabilities` front matter 与现有 `portfolio.capabilities` schema 不一致。

人工评审最终采用“继续补跨域案例”和“三层证据”的方向，否决新增目录与未经验证的固定更新频率。

## 可检查的实现

| 文件 | 作用 |
|------|------|
| [`tools/curate.py`](tools/curate.py) | 输入读取、profile 调用、Schema 检查和可选保存 |
| [`references/system-prompt.md`](references/system-prompt.md) | 仓库语境、类型定义和禁止事项 |
| [`references/output-schema.md`](references/output-schema.md) | 7 个必需输出章节 |
| [`tools/test_curate.py`](tools/test_curate.py) | Schema 检查和稳定文件名的离线测试 |
| `evidence/2026-06-19-portfolio-transformation.md` | 原始运行输出与人工评审 |

## 已验证范围

- 本地凭证 profile 可以成功调用当前配置的 DeepSeek 模型。
- 一次真实输出覆盖所有必需章节。
- CLI 可以检测缺失章节并向 stderr 发出警告。
- 文件名生成与 Schema 检查可以在无网络环境下重复测试。
- 输出中没有打印或保存 API Key。

## 未验证范围

- 不同输入类型下的分类一致性。
- 多次运行的输出稳定性和成本。
- DeepSeek、Qwen、Kimi 等模型之间的质量差异。
- 自动归档建议是否长期适合当前仓库结构。
- 语音笔记、超长输入和多语言内容。

## 快速开始

### 配置凭证

```bash
cp meta/llm-credentials.env.example .private/llm-credentials.env
# 填入 DEEPSEEK_MEDIA_AGENT_API_KEY

cd agents/inspiration-curator/tools
pip install -r requirements.txt
python3 ../../../scripts/llm_env.py --profile deepseek-media-agent --check
```

### 运行

```bash
python3 curate.py "想到可以用 Telegram bot 做手机发任务，本机 Agent 消费队列"

pbpaste | python3 curate.py

python3 curate.py -f my-notes.txt --save
```

`--save` 只写入 `.private/inbox/`，不会自动修改公开内容。

### 测试

```bash
python3 -m unittest agents/inspiration-curator/tools/test_curate.py -v
```

## Cursor / Codex Skill

安装后可以调用：

```text
$inspiration-curator 今天听到播客讲 context 三层，想写成 essay
```

Agent 按 [`references/system-prompt.md`](references/system-prompt.md) 和
[`references/output-schema.md`](references/output-schema.md) 整理结果。

## 限制与下一步

一次成功运行只能证明链路可用，不能证明分类可靠。下一步用同一组 10 条固定输入分别运行多次，比较类型判断、澄清问题和归档路径的一致性。

当前 Schema 只能检查章节是否存在，不能判断内容是否具体、是否忠于原文。后续评估需要加入人工评分维度，而不是继续堆格式校验。

当前 profile 绑定 DeepSeek，但 CLI 已通过统一 LLM profile 获取 provider、base URL 和 model。只有在积累固定评测集后，才值得进行多模型对比。

## 该领域同行会怎么挑刺

1. **“一次样例不足以证明 Agent 有效。”** 本文明确限制结论，并把固定评测集作为下一步，不使用单次结果推导泛化能力。
2. **“Schema 完整只是格式正确，不代表建议正确。”** 本文保留原始输出并逐条人工评审，明确否决了目录、元数据和更新频率建议。
3. **“人工评审不可复现。”** 当前把评审依据公开为有效、遗漏、错误三类；量化评分标准推到固定评测集阶段，因为没有足够样本时提前设计指标会制造伪精确。
