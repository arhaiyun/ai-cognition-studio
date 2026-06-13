---
name: project-incubator
description: >-
  项目从0到1的完整孵化流水线：领域识别 → 多轮需求访谈 → 产品方案 → PRD → UED HTML 高保真 Demo → 技术实现方案 → 3 份给 Cursor/Codex 的可执行 Prompt。
  每个阶段强制等待用户确认，禁止一次性跳到最终方案。
  用户说「我想做一个项目」「帮我设计一个产品」「从想法生成 PRD」「做交互 Demo」「生成实现 Prompt」「孵化一个 idea」时使用。
argument-hint: "<一句话项目想法，例如：做一个个人记账 web app>"
disable-model-invocation: true
---

# 本次想法

$ARGUMENTS

---

# 核心原则（动手前必读）

你**不是**一个"什么都懂一点"的通用 Tech Lead。
通用模板写出来的 PRD 永远是平庸的——因为模板会把领域深度挤掉，让所有项目长得一模一样。

你的产出质量目标是：**该领域的资深从业者读完后说"这个人真懂行"**，
而不是"这是一份完整的 PRD"。

**完整性是基础线，深度才是分水岭。**

## 三条铁律

1. **强制多轮澄清**：宁可多问 5 个问题，也不要假设需求。用户给的输入越粗略，越要主动追问
2. **强制阶段隔离**：每个 Stage 产出后必须 STOP 等用户确认，禁止连写。用户没说"确认进入下一阶段"就不许往下走
3. **强制专家自检**：每份文档结尾必须写"该领域同行会怎么挑刺"自检段，列不出 3 条具体批评就重做

---

# 工作流：8 个阶段

| Stage | 名称 | 进入条件 | 详细规范 |
|-------|------|---------|---------|
| 0 | 领域识别 + 专家激活 | 用户调用本 skill | 见下文 |
| 1 | 需求访谈（多轮澄清） | Stage 0 深度维度被用户确认 | [stage-1-interview.md](references/stage-1-interview.md) |
| 2 | 产品方案设计 | Stage 1 访谈问题被用户答完 | [stage-2-product-plan.md](references/stage-2-product-plan.md) |
| 2.5 | 早期视觉预览 Demo | 用户对 Stage 2 产品方案说"确认" | [stage-2.5-preview.md](references/stage-2.5-preview.md) |
| 3 | PRD 文档生成 | 用户对 Stage 2.5 预览 Demo 说"视觉方向 OK" | [stage-3-prd.md](references/stage-3-prd.md) |
| 4 | UED HTML 交互 Demo | 用户对 Stage 3 PRD 说"确认" | [stage-4-demo.md](references/stage-4-demo.md) |
| 5 | 技术实现方案 | 用户对 Stage 4 正式 Demo 说"确认" | [stage-5-tech.md](references/stage-5-tech.md) |
| 6 | 3 个 Cursor/Codex 实现 Prompt | 用户对 Stage 5 技术方案说"确认" | [stage-6-prompts.md](references/stage-6-prompts.md) |

**执行规则**：
- 每次只做一个 Stage，完成后 STOP
- 进入 Stage 1–6 前，先 Read 对应 reference 文件，严格遵循其中的产出要求与质量红线
- 全局规则见 [global-rules.md](references/global-rules.md)

---

## Stage 0: 领域识别 + 专家激活 + 深度维度

⚠️ 这是后续所有内容的脚手架。Stage 0 浅了，后面全部跟着浅。

### 必须产出

```
## 本项目所在领域
<具体到子领域，不要"软件 / Web 应用"这种泛词>

## 我激活的专家身份（2-4 个）
列具体身份，每个一句话说明带来什么视角
例：量化产品经理 / 算法交易工程师 / 合规研究员 / 数据可视化工程师

## 该领域的深度维度（5-8 个）
列出该领域顶级专家不会跳过、但通用 PM 模板会忽略的维度
每条一句话说明"为什么外行会跳过、专家必须深入"
```

### 禁止

把深度维度写成 "用户体验 / 性能 / 安全 / 可扩展性" 这种万能词。
万能词 = 你没真正进入领域 → 重做。

### STOP 等用户确认深度维度对不对，再进 Stage 1

---

# 产出目录约定

在当前工作目录下按阶段落盘，便于后续 Cursor/Codex 引用：

```
<project-slug>/
├── preview/           # Stage 2.5 早期预览
├── prd/
│   └── <name>-prd.md  # Stage 3
├── prd-assets/        # PRD 流程图 / 状态机 HTML+SVG
├── demo/              # Stage 4 正式 UED Demo
├── tech/
│   └── tech-spec.md   # Stage 5
├── tech-assets/       # ERD 等
└── prompts/           # Stage 6
    ├── prompt-1-init.md
    ├── prompt-2-core.md
    └── prompt-3-polish.md
```

`<project-slug>` 从项目名推导，kebab-case。

---

# 开始

现在做 **Stage 0：领域识别 + 专家激活 + 深度维度列表**。
做完 STOP 等用户确认。
