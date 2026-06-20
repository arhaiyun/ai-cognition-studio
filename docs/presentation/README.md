# Presentation 素材

## AI 产品的六个层次

| 文件 | 用途 |
|------|------|
| [`ai-product-six-layers-slides.md`](ai-product-six-layers-slides.md) | **PPT 源文件**（Marp 格式，可导出 PPTX/PDF） |
| [`ai-product-six-layers-presentation-script.md`](ai-product-six-layers-presentation-script.md) | **讲解稿**（逐页精简/完整口播） |

关联文章：[`cognition/02-ai-product-six-layers.md`](../../cognition/02-ai-product-six-layers.md)

## 导出 PowerPoint

### 方式一 · VS Code

1. 安装扩展 [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
2. 打开 `ai-product-six-layers-slides.md`
3. 命令面板 → `Marp: Export Slide Deck` → 选择 **PPTX** 或 **PDF**

### 方式二 · 命令行

```bash
cd ai-cognition-studio
npx @marp-team/marp-cli docs/presentation/ai-product-six-layers-slides.md --pptx -o ~/Desktop/ai-product-six-layers.pptx
npx @marp-team/marp-cli docs/presentation/ai-product-six-layers-slides.md --pdf -o ~/Desktop/ai-product-six-layers.pdf
```

## 演示建议

- **架构图 live demo**：Presentation 中打开 [`../diagrams/ai-product-six-layers.html`](../diagrams/ai-product-six-layers.html)
- **时长**：15 分钟用讲解稿「精简口播」；20 分钟用「完整口播」
- **主题色**：与架构图一致（背景 `#0b0f14`，强调 `#5b9cf5` / `#34d399`）
