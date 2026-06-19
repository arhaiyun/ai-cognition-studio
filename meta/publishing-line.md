---
title: 内容更新主线
date: 2026-06-02
status: stable
type: meta
audience: [self, dev, general]
tags: [publishing, cognition, series]
summary: 每周 2–3 篇 AI 认知实践深度文的主线计划、节奏与连载规范。
---

# 内容更新主线

> **TL;DR**：不再零散发单篇。所有深度内容归入连载 **《AI 副驾实践手记》**，按 **ISO 周** 推进，每周 **2–3 篇** 构成一条可跟读的主线。

---

## 为什么要有主线

| 零散模式（旧） | 主线模式（新） |
|----------------|----------------|
| 想到哪写到哪 | 每周一个主题，2–3 篇形成小闭环 |
| 读者不知下一篇是什么 | Studio 首页展示「本周连载」 |
| cognition / essays 界限模糊 | 用 `slot` 区分：框架 / 实践 / 手册 / 复盘 |
| 难衡量进度 | 按周打卡，阶段末复盘 |

---

## 连载信息

| 字段 | 值 |
|------|-----|
| **连载 ID** | `copilot-practice-2026` |
| **标题** | AI 副驾实践手记 |
| **副标题** | 从认知边界到可复用 Agent 工作流 |
| **节奏** | 每周 2–3 篇 · 周二 / 周四 / 周六 |
| **机器可读计划** | [publishing-schedule.json](publishing-schedule.json) |

---

## 三阶段（12 周）

### 阶段一 · 认知打底（W21–W25）

**目标**：建立副驾心智模型，能描述 AI 能/不能做什么。

| 周 | 主题 | 篇数 | 状态 |
|----|------|------|------|
| W21 | 副驾心智模型 | 1 | ✅ 已发 |
| W22 | 模型接入与选型 | 1 | ✅ 已发 |
| W23 | Context 三层设计 | 3 | 🔄 进行中 |
| W24 | 幻觉与校准 | 2 | 📋 计划 |
| W25 | 阶段复盘 | 2 | 📋 计划 |

### 阶段二 · 工具与 MCP（W26–W29）

**目标**：独立做最小 MCP，知道何时该用 workflow tool。

### 阶段三 · Skills 与 Agent（W30–W33）

**目标**：Skill 可触发、Agent 工作流可复现。

详见 [learning-roadmap.md](learning-roadmap.md)（已与主线对齐）。

---

## 每周怎么写（2–3 篇模板）

每周围绕 **一个主题**，按 slot 组合：

| Slot | 目录 | 作用 | 篇幅 |
|------|------|------|------|
| `pillar` | `cognition/` 或 `essays/` | 本周核心认知/框架 | 1500–3000 字 |
| `practice` | `essays/` 或 `labs/*/README` | 真实案例、踩坑、可复现步骤 | 1000–2500 字 |
| `handbook` / `input` | `playbooks/` 或 `podcast/` | 可选第三篇：清单、播客 takeaway | 800–1500 字 |
| `recap` | `essays/` | 阶段末：改了什么判断 | 1000–2000 字 |

**最低交付**：每周至少 **pillar + practice** 两篇；有输入素材时加第三篇。

---

## Front Matter（连载字段）

编入连载的文章必须带：

```yaml
series:
  id: copilot-practice-2026
  title: AI 副驾实践手记
  part: 3              # 连载全局序号，递增
  week: 2026-W23       # ISO 周，与 publishing-schedule 一致
  slot: pillar         # pillar | practice | handbook | input | recap
```

非连载内容（如单独 lab 文档）可省略 `series`。

模板：[`essays/_template-series.md`](../essays/_template-series.md)

---

## 工作流

```
.private/drafts/          # 草稿（不入库）
       ↓ 定稿
essays/2026-W23-01-*.md   # 按「周-序号-主题」命名
       ↓ 更新
meta/publishing-schedule.json   # 改 status: planned → published
       ↓ 构建
cd studio && npm run content:build
       ↓
Studio 首页「本周连载」自动更新
```

### 每周 Checklist

- [ ] 确认本周 `theme` 与 2–3 个 `sourcePath`
- [ ] 写完 pillar + practice（第三篇可选）
- [ ] front matter 填齐 `series.*`
- [ ] 更新 `publishing-schedule.json` 中对应 `week.status` 与各文 `status`
- [ ] `npm run content:build` 刷新 Studio
- [ ] 阶段末写 `recap` 并修订 cognition 索引文

---

## 与 Studio 的关系

- 首页 **「本周连载」**：读取 `publishing-schedule.json` 的 `currentWeek`
- 侧栏 **「更新主线」**：同系列文章按 `part` 排序
- 完整计划页：即本文

---

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-02 | v1：确立连载、周计划与 front matter 规范 |
