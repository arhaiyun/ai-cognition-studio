---
title: Agent Skills 使用说明
date: 2026-06-21
status: stable
type: handbook
tags: [skill, cursor, codex, alfred]
summary: 当前可用的 Cursor / Codex Agent Skills 索引、触发语与本地链接，供 Alfred 快速打开。
---

# Agent Skills 使用说明

> **Alfred 主入口（收藏这个）**  
> `file:///Users/arhaiyun/github/ai-cognition-studio/docs/skills-guide.html`

在 Alfred 中：输入 `open` 或自定义 Web Search，粘贴上述 URL 即可打开完整导航页（含全部可点击链接）。

---

## 怎么调用 Skill

| 平台 | 调用方式 | 示例 |
|------|----------|------|
| **Cursor** | 对话描述需求，或 `@skill-name`，部分支持 `/skill-name` | `@design-studio 帮我把这篇文章做成自媒体套装` |
| **Codex** | `$skill-name` + 描述 | `$arch-diagram-builder RAG 检索链路` |
| **Claude Code** | `/skill-name` + 参数 | `/project-incubator 个人记账 web app` |

Skill 会根据 **description 里的关键词**自动触发；说不准时可直接 `@` 或 `$` 点名。

---

## 一、内容与设计（自媒体 / 演示）

| Skill | 干什么 | 怎么说 | Cursor | Codex | 文档 |
|-------|--------|--------|--------|-------|------|
| **design-studio** | 自媒体设计编排：判型 → 路由子 Skill → 品牌 → 验收 | 「自媒体设计」「内容包装」「封面+口播」 | `@design-studio` | `$design-studio` | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/design-studio/SKILL.md) · [README](file:///Users/arhaiyun/github/ai-cognition-studio/labs/design-studio/README.md) |
| **ppt-builder** | 大会级 Keynote / 幻灯片（单文件 HTML） | 「做 PPT」「做 keynote」「把文章做成幻灯片」 | `@ppt-builder` | — | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/.cursor/skills/ppt-builder/SKILL.md) |
| **arch-diagram-builder** | 交互式分步架构图 / 数据流演示 | 「画架构图」「动态架构图」「交互式演示」 | `@arch-diagram-builder` | `$arch-diagram-builder` | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/arch-diagram-builder/SKILL.md) · [设计系统](file:///Users/arhaiyun/github/ai-cognition-studio/labs/arch-diagram-builder/references/design-system.md) |
| **frontend-design** | 高审美前端页面 / 海报 / Landing（差异化视觉） | 「做一个好看的 landing」「美化 UI」 | 自动触发 | — | [SKILL](file:///Users/arhaiyun/.cursor/skills/frontend-design/SKILL.md) |

**成品示例（Alfred 可打开）**

- [投资系列图导航](file:///Users/arhaiyun/github/ai-cognition-studio/docs/diagrams/ai-investment-index.html)
- [Agent 开发系统架构图](file:///Users/arhaiyun/github/ai-cognition-studio/docs/diagrams/ai-agent-dev-system.html)
- [六层产品 Keynote](file:///Users/arhaiyun/github/ai-cognition-studio/ai-product-six-layers-keynote.html)
- [自媒体设计方法论](file:///Users/arhaiyun/github/ai-cognition-studio/cognition/08-design-for-self-media.md)
- [自媒体 Playbook](file:///Users/arhaiyun/github/ai-cognition-studio/playbooks/self-media-design.md)

---

## 二、发布与素材工具

| Skill | 干什么 | 怎么说 | Cursor | Codex | 文档 |
|-------|--------|--------|--------|-------|------|
| **feishu-doc-writer** | Markdown → 飞书 Wiki 子文档 | 「发飞书」「同步到飞书知识库」 | 自动触发 | `$feishu-doc-writer` | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/feishu-doc-writer/SKILL.md) |
| **social-video-toolkit** | 社媒视频下载、转写、帧分析、字幕 OCR | 「下载这个 B 站视频」「提取字幕」 | 自动触发 | `$social-video-toolkit` | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/social-video-toolkit/SKILL.md) |

---

## 三、产品与工程

| Skill | 干什么 | 怎么说 | Cursor | Codex | 文档 |
|-------|--------|--------|--------|-------|------|
| **project-incubator** | 0→1 孵化：访谈 → PRD → UED Demo → 实现 Prompt | 「我想做一个项目」「从想法生成 PRD」 | `/project-incubator` | `$project-incubator` | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/project-incubator/SKILL.md) |
| **mcp-builder** | 搭建 MCP Server（Python / TS） | 「写一个 MCP」「对接外部 API」 | 自动触发 | — | [SKILL](file:///Users/arhaiyun/.cursor/skills/mcp-builder/SKILL.md) |
| **inspiration-curator** | 整理零散灵感 → cognition/essay 结构 | 「整理一下这个想法」「brain dump」 | `$inspiration-curator` | — | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/agents/inspiration-curator/SKILL.md) |
| **doc-coauthoring** | 结构化协作文档（提案 / Spec / RFC） | 「写设计文档」「起草 PRD」 | 自动触发 | — | [SKILL](file:///Users/arhaiyun/.cursor/skills/doc-coauthoring/SKILL.md) |
| **webapp-testing** | Playwright 测本地 Web、截图 | 「测一下这个页面」「Playwright 截图」 | 自动触发 | — | [SKILL](file:///Users/arhaiyun/.cursor/skills/webapp-testing/SKILL.md) |
| **architecture-diagram-html** | 静态 HTML 架构图（非步进版，旧） | 「HTML 架构图」 | `/architecture-diagram-html` | — | [SKILL](file:///Users/arhaiyun/.cursor/skills/architecture-diagram-html/SKILL.md) |

> **推荐**：交互步进架构图优先用 **arch-diagram-builder**；`architecture-diagram-html` 为早期版本。

---

## 四、Skill 元工具（创建 / 同步 / 优化）

| Skill | 干什么 | 怎么说 | 文档 |
|-------|--------|--------|------|
| **studio-skill-sync** | 新建 Skill 时三端同步（labs + Cursor + Codex） | 「安装这个 skill」「新建 skill」 | [SKILL](file:///Users/arhaiyun/github/ai-cognition-studio/labs/studio-skill-sync/SKILL.md) · [Playbook](file:///Users/arhaiyun/github/ai-cognition-studio/playbooks/skill-dual-install.md) |
| **skill-creator** | 创建 / 优化 Skill、跑 eval | 「写一个 skill」「优化 skill 描述」 | [SKILL](file:///Users/arhaiyun/.cursor/skills/skill-creator/SKILL.md) |
| **create-skill** | Cursor 官方：编写 SKILL.md 结构 | 「create skill」 | [SKILL](file:///Users/arhaiyun/.cursor/skills-cursor/create-skill/SKILL.md) |
| **create-rule** | 写 Cursor Rules | 「加一条 rule」 | [SKILL](file:///Users/arhaiyun/.cursor/skills-cursor/create-rule/SKILL.md) |

**同步命令**（终端）：

```bash
cd ~/github/ai-cognition-studio
./scripts/sync-skill.sh <skill-name>
```

---

## 五、Cursor 内置 Skill（IDE 工作流）

| Skill | 干什么 | 触发场景 |
|-------|--------|----------|
| **babysit** | PR 评论 triage、修 CI、保持可合并 | 「babysit 这个 PR」 |
| **canvas** | 数据分析 / 图表 / 审计 → 侧边 Canvas | 产出表格、时间线、交互分析时 |
| **automate** | 创建 Cursor Automations | 「创建一个 automation」 |
| **sdk** | Cursor SDK（TS/Python）集成 | `@cursor/sdk`、`Agent.create` |
| **review-bugbot** | Bugbot 式代码审查 | 「跑 bugbot review」 |
| **review-security** | 安全审查 | 「security review」 |
| **split-to-prs** | 拆分为多个小 PR | 「split to PRs」 |
| **loop** | 定时重复执行 prompt | `/loop 5m ...` |
| **create-hook** | Cursor Hooks | 「写 hook」 |
| **update-cursor-settings** | 改 settings.json | 「改字体/主题」 |
| **statusline** | CLI 状态栏定制 | 「status line」 |

文档目录：[skills-cursor](file:///Users/arhaiyun/.cursor/skills-cursor/)

---

## 六、三端安装对照

| Skill | labs 源码 | Cursor | Codex |
|-------|-----------|--------|-------|
| design-studio | ✅ | ✅ | ✅ |
| arch-diagram-builder | ✅ | ✅ | ✅ |
| feishu-doc-writer | ✅ | ✅ | ✅ |
| social-video-toolkit | ✅ | ✅ | ✅ |
| studio-skill-sync | ✅ | ✅ | ✅ |
| project-incubator | ✅ | — | ✅ |
| ppt-builder | ❌ 待迁入 | ✅ 仅项目级 | ❌ |
| frontend-design 等 | ❌ 外部 | ✅ 全局 | ❌ |

---

## Alfred 快捷收藏建议

| 名称 | URL |
|------|-----|
| **Skills 导航页** | `file:///Users/arhaiyun/github/ai-cognition-studio/docs/skills-guide.html` |
| **Studio 门户** | `http://127.0.0.1:5173`（需先 `cd studio && npm run dev`） |
| **投资图导航** | `file:///Users/arhaiyun/github/ai-cognition-studio/docs/diagrams/ai-investment-index.html` |
| **Labs 索引** | `file:///Users/arhaiyun/github/ai-cognition-studio/labs/README.md` |

### Alfred Workflow 配置示例

1. **Web Search / Open URL**：Keyword `skills` → 打开 `file:///Users/arhaiyun/github/ai-cognition-studio/docs/skills-guide.html`
2. **File Filter**：Scope `~/github/ai-cognition-studio/labs/*/SKILL.md`，快速打开某个 Skill 源码

---

## 相关链接

- [Labs 索引](file:///Users/arhaiyun/github/ai-cognition-studio/labs/README.md)
- [Playbooks](file:///Users/arhaiyun/github/ai-cognition-studio/playbooks/)
- [Cognition 认知框架](file:///Users/arhaiyun/github/ai-cognition-studio/cognition/README.md)
