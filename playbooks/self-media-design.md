---
title: 自媒体设计 Playbook
date: 2026-06-21
status: stable
type: playbook
audience: [self, dev]
tags: [design, self-media, skill, pipeline]
summary: 从 cognition 定稿到 Keynote/架构图/封面/口播/发布的可勾选清单。
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 6
  week: 2026-W25
  slot: handbook
---

# 自媒体设计 Playbook

> 配合 Skill：`design-studio`（编排）、`ppt-builder`（Keynote）、`arch-diagram-builder`（交互图）

## 何时使用

- [ ] 新系列内容要配套视觉（投资、技术分享、专栏）
- [ ] 同一主题要发多平台（B站 / 公众号 / 飞书 / 小红书）
- [ ] 已有文章，要补图、口播、封面

## 启动前（5 分钟）

- [ ] 读 [brand-tokens.md](../labs/design-studio/references/brand-tokens.md) 选定 palette
- [ ] 读 [platform-specs.md](../labs/design-studio/references/platform-specs.md) 确认比例
- [ ] 一句话结论写下来（封面标题素材）

## 阶段 1 · 定稿

- [ ] cognition/essays Markdown 定稿
- [ ] frontmatter：title, date, series, tags
- [ ] 章节可映射为「页」或「步」（每节 ≈ 1 页或 1–2 步）
- [ ] 数据有来源或 `[TODO]`

## 阶段 2 · 判型（design-studio）

- [ ] 观点叙事 → `ppt-builder`
- [ ] 系统/runtime → `arch-diagram-builder`
- [ ] 轻量流程 → Mermaid 嵌文章
- [ ] 竖屏短视频 → Remotion（或录屏裁切）
- [ ] 封面/OG → design-studio 封面快路径

## 阶段 3 · 生成

### Keynote

- [ ] 先出分页大纲，用户确认后再生成
- [ ] 水印「云牧元宇宙」
- [ ] 保存 `{主题}-keynote.html`

### 架构图

- [ ] 读 design-system.md
- [ ] 6–9 步，一步一动作
- [ ] flow-strip / order-badge / conn-order
- [ ] 保存 `docs/diagrams/{主题}.html`

### 封面

- [ ] 尺寸对照 platform-specs
- [ ] 主标题 = 结论句
- [ ] 更新 `assets/{系列}/manifest.json`

## 阶段 4 · 口播

- [ ] 用 [script-template](../labs/design-studio/references/script-template.md)
- [ ] 具体案例贯穿（非抽象系统）
- [ ] 每步/页对齐 HTML STEPS 或 slide 序号
- [ ] 写精简版 + 完整版

## 阶段 5 · 验收

```bash
open -a "Google Chrome" docs/diagrams/xxx.html
node labs/arch-diagram-builder/scripts/verify-diagram.mjs docs/diagrams/xxx.html
node labs/design-studio/scripts/verify-pipeline.mjs <series-slug>
```

人工检查：

- [ ] 5 秒法则：每页/步能 get 重点
- [ ] 顺序不读稿也能跟上
- [ ] 同系列 palette 一致
- [ ] 屏上无仓库路径

## 阶段 6 · 发布

- [ ] git commit + push（图与文同库）
- [ ] 飞书：`feishu-doc-writer`
- [ ] B站：16:9 录屏 + 口播
- [ ] 小红书：9:16 切片（待 Remotion）
- [ ] 公众号：头图 900×383 + 文内嵌入

## 系列资产对照表（维护）

| 系列 | cognition | diagrams | keynote | script | 状态 |
|------|-----------|----------|---------|--------|------|
| AI 投资 | 04–07 | 5 张 | — | 待补 | 图✅ 稿⏳ |
| Agent 系统 | 03 | ai-agent-dev-system | — | ✅ | 完整 |
| 六层产品 | 02 | ai-product-six-layers | six-layers-keynote | ✅ | 完整 |

## 常见错误

| 错误 | 修复 |
|------|------|
| 箭头堆叠 | path-routing.md 分车道 |
| 顺序只在稿里 | 加 flow-strip / 角标 |
| 三套配色混用 | brand-tokens 系列表锁定 |
| ppt 塞整段文字 | 一页一观点，拆页 |
| 生成不预览 | html-diagram-preview 规则：Chrome 必开 |

## 演进待办

- [ ] ppt-builder 迁入 `labs/` 三端同步
- [ ] `labs/remotion-clips` 竖屏模板
- [ ] 投资系列口播稿
- [ ] 补齐 `ai-product-six-layers-deck.html` 或 README 去断链
