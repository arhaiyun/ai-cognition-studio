# Presentation 素材

## AI 产品的六个层次

| 文件 | 用途 |
|------|------|
| **[`ai-product-six-layers-keynote.html`](../../ai-product-six-layers-keynote.html)** | **主推荐 · Google I/O 风格 Keynote**（15 页，项目根目录） |
| [`ai-product-six-layers-deck.html`](ai-product-six-layers-deck.html) | 备选 · glass 视觉 Chrome 演示 |
| [`ai-product-six-layers-slides.md`](ai-product-six-layers-slides.md) | Marp 源文件（可导出 PPTX，视觉较简） |
| [`ai-product-six-layers-presentation-script.md`](ai-product-six-layers-presentation-script.md) | 讲解稿（逐页精简/完整口播） |
| [`assets/from-consumer-to-architect.png`](assets/from-consumer-to-architect.png) | 原文配图 · Consumer → Architect 总览 |

关联文章：[`cognition/02-ai-product-six-layers.md`](../../cognition/02-ai-product-six-layers.md)

## 设计说明

视觉对齐 **Superlinear Academy 原文配图**：

- **主色**：电光青 `#00d4ff` · 深海军蓝底
- **风格**：Glassmorphism 玻璃面板 · 3D 透视地台 · 上升箭头
- **结构**：L3–L6 递增塔台 · 底部 Six Product Layers 图标条
- **字体**：Noto Sans SC + Inter

## 浏览器演示（推荐）

```bash
cd ai-cognition-studio
open -a "Google Chrome" docs/presentation/ai-product-six-layers-deck.html
```

- **翻页**：`→` / `Space` / 点击右半屏
- **后退**：`←` / 点击左半屏
- **全屏**：`F`
- **首页**：原文配图全屏（与 Superlinear 一致）

## Marp 导出（备选）

```bash
npx @marp-team/marp-cli docs/presentation/ai-product-six-layers-slides.md --pptx -o ~/Desktop/ai-product-six-layers.pptx
```

## 演示建议

- **架构图 live demo**：[`../diagrams/ai-product-six-layers.html`](../diagrams/ai-product-six-layers.html)
- **时长**：15 分钟用讲解稿「精简口播」；20 分钟用「完整口播」
