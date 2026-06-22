# 全链路 Pipeline

从认知定稿到可传播资产的工程化流水线。

```
cognition/essays 定稿
        │
        ▼
┌───────────────────┐
│ 1. 判型 + 套餐     │  design-studio 对话确认
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 2. 视觉资产        │  ppt / diagram / cover / mermaid
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 3. 口播 / 脚本     │  presentation-script + 步进对齐
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 4. 预览验收        │  Chrome + verify-diagram.mjs
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 5. 发布 / 录屏     │  飞书 / B站 / 小红书
└───────────────────┘
```

## 阶段 1 · 内容定稿

**输入**：`cognition/*.md` 或 `essays/*.md`

**检查**：
- [ ] 一句话结论清晰
- [ ] 章节可映射到「页」或「步」
- [ ] 数据带来源或标 `[TODO]`
- [ ] frontmatter 完整（title, date, series）

## 阶段 2 · 视觉资产

按 `output-routing.md` 生成，并更新 manifest：

```json
{
  "series": "ai-investment",
  "palette": "arch-five-color",
  "assets": [
    { "id": "thesis", "file": "ai-investment-thesis.html", "label": "投资逻辑总图", "steps": 7 }
  ]
}
```

**路径约定**：

| 类型 | 路径 |
|------|------|
| 交互图 | `docs/diagrams/` |
| Keynote | 项目根 `*-keynote.html` |
| 静态配图 | `docs/presentation/assets/{系列}/` |
| 导航索引 | `docs/diagrams/*-index.html` |

## 阶段 3 · 口播与步进对齐

口播稿每一步必须对应：
- 架构图：`STEPS[n]` 的 nodes/conns/chips
- Keynote：第 n 页 `.slide`

模板 → `references/script-template.md`

**口播铁律**（继承 arch 图经验）：
- 用**具体案例**贯穿（如 Cursor 登录页开发），不用抽象「某系统」
- 每步说清**动作**（谁调用谁、数据是什么）
- 标注预估时长与停顿点

## 阶段 4 · 预览验收

```bash
# 架构图
open -a "Google Chrome" docs/diagrams/xxx.html
node labs/arch-diagram-builder/scripts/verify-diagram.mjs docs/diagrams/xxx.html

# Keynote
open -a "Google Chrome" ai-xxx-keynote.html

# 管线自检（可选）
node labs/design-studio/scripts/verify-pipeline.mjs ai-investment
```

**人工 5 秒法则**：
- 每页/每步 5 秒内能 get 到重点
- 顺序不读稿也能跟上
- 水印与 palette 与系列一致

## 阶段 5 · 发布

| 渠道 | 工具 | 注意 |
|------|------|------|
| 飞书 Wiki | `feishu-doc-writer` | cognition MD 同步；图用 Studio embed 或截图 |
| B站 | 录屏 + 口播 | 16:9 全屏，步进用 → 键 |
| 小红书 | 竖屏切片 | 9:16 裁切或 Remotion 重渲 |
| 公众号 | 长文 + 头图 | 头图 900×383，文内嵌入图 |
| GitHub | git push | 图与文章同库，可复现 |

## 阶段 6 · 短视频扩展（P3 待建）

```
交互图 HTML 录屏（16:9）
        │
        ▼
Remotion 模板：缩放 + 字幕 + 钩子标题（9:16）
        │
        ▼
导出 MP4 → 社媒发布
```

参考：`remotion-dev/skills`、`xsourabhsharma/remotion-marketing-video-skill`

## 投资系列范例（已跑通）

| 资产 | 路径 |
|------|------|
| 文章 4 篇 | `cognition/04`–`07` |
| 交互图 4+1 | `docs/diagrams/ai-investment-*.html` |
| 导航 | `docs/diagrams/ai-investment-index.html` |
| 口播 | 待补 `docs/presentation/ai-investment-script.md` |

## 与 Studio 门户

cognition frontmatter 示例：

```yaml
diagram: diagrams/ai-agent-dev-system.html
```

构建时复制到 `studio/public/diagrams/`，门户内可交互阅读。
