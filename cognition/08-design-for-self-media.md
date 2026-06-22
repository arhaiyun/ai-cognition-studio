---
title: 自媒体设计方法论
date: 2026-06-21
status: stable
type: cognition
audience: [self, dev, creator]
tags: [design, self-media, skill, arch-diagram, ppt]
summary: 固定设计系统 + 可变内容模板 + Harness 验收——高效专业视觉产出的工程化路径。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 8
  week: 2026-W25
  slot: framework
diagram: diagrams/ai-investment-index.html
---

# 自媒体设计：如何高效且专业

做自媒体、技术分享、投资研究，越来越离不开**视觉**——封面、架构图、流程图、Keynote、动态演示、短视频。很多人把问题理解成「让 AI 画得好看一点」，但真正拖慢效率、拉低专业感的，是**每次从零设计、风格漂移、无法验收**。

本文给出我们在 `ai-cognition-studio` 里沉淀的工程化答案，并落地为 **`design-studio` Skill**。

---

## 一、问题从哪来

### 1.1 四类典型场景

| 场景 | 例子 | 常见翻车 |
|------|------|----------|
| **观点叙事** | AI 产品六层、工程师成长 | 文字墙、标题像目录 |
| **系统结构** | Agent 开发链路、产业链 | 箭头堆叠、顺序看不清 |
| **流程步骤** | 工单处理、发布流水线 | 静态图无法步进演示 |
| **短视频** | B站讲解切片、小红书 | 横屏录屏硬裁 9:16 |

### 1.2 根因

不是工具不够，而是缺三层工程化：

1. **品牌层**：色、字、水印、语义色——应固定
2. **形态层**：Keynote vs 交互图 vs 封面 vs 视频——应路由清晰
3. **分发层**：16:9 / 9:16 / OG 尺寸——应模板化改编排

---

## 二、核心公式

```
专业产出 = 设计系统（固定）× 内容模板（可变）× Harness（验收）
```

我们在 `arch-diagram-builder` 里最先验证了这一点：五色语义、path 布线、步进 STEPS、`verify-diagram.mjs`——返工次数下降一个数量级。

`ppt-builder` 同理：Google I/O 四色 + 一页一观点 + 分页大纲确认。

**`design-studio` 做的是把两者和其他形态串成一条 pipeline。**

---

## 三、三层模型

```
L3 分发层 ─ 平台规格（B站 16:9、小红书 9:16、公众号头图）
L2 形态层 ─ 媒介（Keynote / 交互图 / Mermaid / Remotion / 封面）
L1 品牌层 ─ Token（palette、水印「云牧元宇宙」、字号间距）
```

同一**系列**锁定一套 palette（见 `labs/design-studio/references/brand-tokens.md`）：

- **Palette A**：Google I/O → Keynote、大会
- **Palette B**：Arch 五色 → 架构图、产业链
- **Palette C**：Superlinear 青 → 六层玻璃态配图

---

## 四、媒介怎么选

| 要表达什么 | 用什么 | Skill |
|------------|--------|-------|
| 观点、框架、金句 | 多页幻灯片 | ppt-builder |
| 系统怎么跑、数据怎么流 | 单页步进图 | arch-diagram-builder |
| 文档内简单流程 | Mermaid | 文内代码块 |
| 15–60s 竖屏 | 代码渲染视频 | Remotion（P3） |
| 缩略图、封面 | 单页 HTML 卡片 | design-studio |

**同一主题可以各出一份**：例如 Agent 系统既有 Keynote 讲「为什么」，又有架构图讲「怎么跑」——互不替代。

---

## 五、专业感的六个来源

1. **语义色一致**——蓝入口、紫智能、绿存储…
2. **顺序必须在图上**——flow-strip、角标、conn-order
3. **布线分车道**——双向线不堆叠
4. **结论先行标题**——写答案，不写名词
5. **留白与层级**——vw 字号、一页一观点
6. **品牌水印统一**——云牧元宇宙

---

## 六、全链路 Pipeline

```
cognition 定稿
    → design-studio 判型
    → 子 Skill 生成（ppt / diagram / cover）
    → 口播稿（与 STEPS/页码对齐）
    → Chrome 预览 + verify 脚本
    → 飞书 / 录屏 / 社媒
```

投资系列是我们跑通的一例：

- 文章：`cognition/04`–`07`
- 交互图：`docs/diagrams/ai-investment-*.html`
- 导航：`docs/diagrams/ai-investment-index.html`

口播稿是下一步要补的短板——模板已在 `script-template.md`。

---

## 七、GitHub 生态怎么借力

不必重复造轮子。我们调研后按优先级分层（详见 `github-ecosystem.md`）：

| 优先级 | 项目 | 补什么 |
|--------|------|--------|
| P1 | [slide-sage](https://github.com/rhnfzl/slide-sage) | Keynote 图表、代码高亮 |
| P1 | [visualcave](https://github.com/varkart/visualcave) | Mermaid 步进 + OG 导出 |
| P1 | [visual-explainer](https://github.com/nicobailon/visual-explainer) | 自动路由图/幻灯片 |
| P2 | [remotion-dev/skills](https://github.com/remotion-dev/skills) | 竖屏短视频 |
| P2 | Excalidraw + Playwright 自检 | 手绘风 + 布局回归 |

**集成原则**：编排不合并——`design-studio` 路由，不把外部 repo 塞进一个巨型 SKILL。

---

## 八、人与 Agent 的分工

| 人 | Agent |
|----|-------|
| 选题、论点、事实核查 | 套模板、生成 HTML |
| 步进顺序、案例选择 | SVG 布线、动画 |
| 平台标题策略 | 多尺寸改编排 |
| 5 秒法则品控 | verify 脚本 |

人负责**什么值得说**；Skill 负责**怎么说才专业**。

---

## 九、怎么用

### Cursor

```
用 design-studio 帮 AI 投资系列规划视觉资产和口播结构
```

### Codex

```
$design-studio AI 产业链投资内容，B站横屏，要交互图+口播大纲
```

### 验收

```bash
node labs/design-studio/scripts/verify-pipeline.mjs ai-investment
./scripts/sync-skill.sh design-studio
```

---

## 十、演进路线

| 阶段 | 内容 | 状态 |
|------|------|------|
| P0 | design-studio + playbook + 本文 | ✅ |
| P1 | ppt-builder 迁入 labs 三端同步 | 待做 |
| P2 | 封面模板库 + manifest 规范 | 进行中 |
| P3 | Remotion 竖屏 `labs/remotion-clips` | 待建 |
| P4 | Excalidraw PNG 回归 | 参考社区 |

---

## 相关链接

- Skill：`labs/design-studio/`
- Playbook：`playbooks/self-media-design.md`
- 架构图方法论：[03-interactive-arch-diagram.md](03-interactive-arch-diagram.md)
- 投资图导航：[ai-investment-index.html](../docs/diagrams/ai-investment-index.html)
