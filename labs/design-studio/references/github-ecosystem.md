# GitHub 生态地图

调研日期：2026-06。按**与本项目互补性**分类，非完整清单。

## 已内化（本仓库）

| 项目/Skill | 路径 | 用途 |
|------------|------|------|
| ppt-builder | `.cursor/skills/ppt-builder/` | 大会级 Keynote HTML |
| arch-diagram-builder | `labs/arch-diagram-builder/` | 交互步进架构图 |
| design-studio | `labs/design-studio/` | 编排 + 品牌 + pipeline |
| social-video-toolkit | `labs/social-video-toolkit/` | 视频下载/转写/帧分析 |
| feishu-doc-writer | `labs/feishu-doc-writer/` | 飞书发布 |

## 推荐引入（按优先级）

### P1 · 幻灯片增强

| Repo | Stars 量级 | 亮点 | 与本项目关系 |
|------|-----------|------|-------------|
| [rhnfzl/slide-sage](https://github.com/rhnfzl/slide-sage) | 社区上升 | Chart.js + Mermaid + 单文件 HTML；Agent Skills 标准 | 可补 ppt-builder 的图表/代码高亮；考虑 references 借鉴 |
| [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer) | 活跃 | 架构图/幻灯片/ diff 可视化；自动路由 Mermaid vs CSS Grid | Cursor rules 集成；`/generate-slides` |

### P1 · 流程图 / 技术图

| Repo | 亮点 | 关系 |
|------|------|------|
| [varkart/visualcave](https://github.com/varkart/visualcave) | Mermaid 11 种图 + 步进 + 导出 PNG/SVG/PDF/OG | 文档内轻量图；OG 卡片 |
| Mermaid Expert（antigravity-awesome-skills） | 语法与主题规范 | cognition 内嵌图质量 |
| Excalidraw Diagram Generator（社区） | Playwright 渲染自检 PNG | 手绘风；布局回归 |

### P2 · 视频

| Repo | 亮点 | 关系 |
|------|------|------|
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | 官方 28 条规则；#4 skills.sh 安装量 | 竖屏短视频主路径 |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | React 代码渲染视频 | `labs/remotion-clips` 基础 |
| [xsourabhsharma/remotion-marketing-video-skill](https://github.com/xsourabhsharma/remotion-marketing-video-skill) | 营销视频工作流 + 设计 token | 竖屏广告模板 |
| [JJenglert1/remotion-claude-video](https://github.com/JJenglert1/remotion-claude-video) | Starter + UI-UX Pro Max 捆绑 | 快速试验 |

### P3 · 设计情报（选用）

| Skill | 亮点 | 关系 |
|-------|------|------|
| frontend-design（Anthropic） | 反 AI slop、差异化美学 | 破圈封面实验 |
| ui-ux-pro-max | 色板/字体配对库 | Remotion 场景参考 |

## 不引入（边界清晰）

| 类型 | 原因 |
|------|------|
| Figma 插件链 | 非代码可复现，与 git 沉淀冲突 |
| Canva 模板 | 闭源，无法 Harness |
| 纯 Midjourney 工作流 | 品控不可编程 |

## 集成策略

1. **编排不合并**：design-studio 路由，不把一个 repo 全塞进 SKILL.md
2. **借鉴 references**：如 slide-sage 的 SVG 模板 → `labs/design-studio/references/svg-templates.md`（按需）
3. **外部 Skill 用 sync 或 npx**：
   ```bash
   npx skills add remotion-dev/skills   # Remotion 官方
   ```
4. **验收优先**：引入任何工具必须有「打开预览」或脚本 exit 0

## 与本项目分工矩阵

| 需求 | 首选 | 备选 |
|------|------|------|
| 大会 Keynote | ppt-builder | slide-sage |
| 步进架构图 | arch-diagram-builder | visual-explainer |
| 文档流程图 | Mermaid | visualcave |
| 手绘白板 | Excalidraw Skill | — |
| 竖屏短视频 | remotion-dev/skills | 录屏裁切 |
| 社媒封面 | design-studio 快路径 | visualcave OG export |
| 参考视频拆解 | social-video-toolkit | — |

## 待观察

- [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills) — 大批量 Agent Skills 合集
- [agentskills.io](https://agentskills.io) — Skill 开放标准；本仓库 labs 已对齐
