# 口播 / 讲解稿模板

保存为 `docs/presentation/{主题}-presentation-script.md` 或 `{主题}-architecture-script.md`。

## Frontmatter（必填）

```yaml
---
title: "{系列名} · 口播稿"
date: 2026-06-21
type: presentation-script
series:
  id: ai-investment-2026
  part: 1
audience: [投资者, 技术同行]
platform: [bilibili-16-9]
duration_target: "8-12 min"
palette: arch-five-color
assets:
  - docs/diagrams/ai-investment-thesis.html
  - ai-investment-keynote.html
speaker: 云牧元宇宙
status: draft
---
```

## 正文结构

### 元信息

| 字段 | 值 |
|------|-----|
| 预估总时长 | |
| 案例主线 | （具体产品/场景，如 Cursor 登录页） |
| 录制建议 | 全屏 Chrome / 麦克风 / 停顿键 |

### 步进 / 分页脚本

每一步或每一页用统一表格：

#### 步 1 / 页 1 · {标题}

| 项 | 内容 |
|----|------|
| 画面 | （观众看到什么：节点、连线、幻灯片元素） |
| 口播 | （逐字或要点） |
| 时长 | ~30s |
| 操作 | 按 → 进入下一步 |
| 强调 | （本步唯一要记住的一句话） |

#### 步 2 / 页 2 · {标题}

（重复上表）

### 精简口播版（15 min 以内）

- 步 1：…
- 步 2：…

### 完整口播版（20 min）

（展开版，含过渡句、反问、案例细节）

### 社媒配套（可选）

| 平台 | 标题 | 标签 | 简介钩子 |
|------|------|------|----------|
| B站 | | | |
| 小红书 | | | |
| 公众号 | | | |

## 与架构图 STEPS 对齐

口播「步 N」必须对应 HTML 内 `STEPS[N-1]`。改顺序时**同步改** HTML 与稿。

## 与 Keynote 对齐

口播「页 N」对应 `#stage .slide:nth-child(N)`。分页大纲先于口播稿定稿。

## 范例

- `docs/presentation/ai-agent-dev-system-architecture-script.md`
- `docs/presentation/ai-product-six-layers-presentation-script.md`
