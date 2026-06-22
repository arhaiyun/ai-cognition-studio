# 品牌 Token · 云牧元宇宙

跨 ppt / diagram / 封面 / 视频的统一品牌层。按**系列**选定一套 palette，同一系列内禁止混用。

## 水印

| 属性 | 值 |
|------|-----|
| 文案 | **云牧元宇宙** |
| ppt | 左下角 `.wm`，每页固定 |
| diagram | 可选右下角，opacity 0.5，11px |
| 封面 | 右下角或底栏居中 |

## Palette A · Google I/O（默认 Keynote / 大会）

用于：`ppt-builder` 产出、技术大会、B站横屏讲解。

```css
:root {
  --blue: #4285F4;
  --red: #EA4335;
  --yellow: #FBBC04;
  --green: #34A853;
  --ink: #202124;
  --sub: #5f6368;
  --line: #dadce0;
  --bg: #ffffff;
  --soft: #f8f9fa;
}
```

字体：`"Google Sans", -apple-system, "PingFang SC", "Microsoft YaHei", Roboto, sans-serif`

## Palette B · Arch 五色（默认架构图 / 流程图）

用于：`arch-diagram-builder`、系统 runtime、投资产业链图。

| 语义 | 色值 | 用途 |
|------|------|------|
| 蓝 | `#4285F4` | 入口、请求、用户 |
| 紫 | `#9C27B0` | LLM、Agent、推理 |
| 绿 | `#34A853` | 存储、记忆、数据 |
| 橙 | `#FF6D00` | 工具、外部 API、执行 |
| 青 | `#00BCD4` | 监控、评估、可观测 |
| 中性 | `#B0B8C8` | 默认描边 |
| 背景 | `#FFFFFF` | 白底录屏 |

完整组件规范 → `labs/arch-diagram-builder/references/design-system.md`

## Palette C · Superlinear 青（长文配图 / Glass）

用于：六层产品框架、深度长文配图、玻璃态 deck。

```css
:root {
  --accent: #00d4ff;
  --navy: #0a1628;
  --glass: rgba(255,255,255,0.08);
  --glass-border: rgba(0,212,255,0.25);
}
```

字体：Noto Sans SC + Inter

## 封面 / 竖屏卡片（Palette A 简化）

```css
:root {
  --cover-bg: linear-gradient(135deg, #0a1628 0%, #1a2744 100%);
  --cover-accent: #4285F4;
  --cover-title: #ffffff;
  --cover-sub: rgba(255,255,255,0.72);
}
```

## 间距与字号（横屏 16:9）

| 元素 | 规范 |
|------|------|
| 主标题 | 4.5–5.5vw（Keynote）/ 48–64px（封面） |
| 副标题 | 1.6–2vw / 18–24px |
| 页边距 | 7–9vw 水平，6–8vh 垂直 |
| 卡片圆角 | 12–16px |
| 卡片间距 | 2–3vw |

## 竖屏 9:16 调整

- 主标题：8–10vw 或 36–44px
- 安全区：顶 120px、底 200px（平台 UI 遮挡）
- 信息密度：主标题 + 1 行副标题 + 1 视觉锚点，禁止超过 3 行正文

## 系列绑定规则

| 系列 | Palette | 子 Skill |
|------|---------|----------|
| AI 产品六层 | A 或 C | ppt-builder |
| Agent 开发系统 | B | arch-diagram-builder |
| AI 投资研究 | B | arch-diagram-builder + 口播 |
| 工程师成长 Keynote | A | ppt-builder |

新建系列时在此表追加一行。
