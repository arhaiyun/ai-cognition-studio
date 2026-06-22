---
title: design-studio · 自媒体设计编排 Skill
date: 2026-06-21
status: stable
type: lab
tags: [skill, design, self-media, ppt, diagram, video]
summary: 统一品牌 token、平台规格与子 Skill 路由，从 cognition 到可传播视觉资产的全链路编排。
---

# design-studio

**自媒体与专业内容的设计编排器**——不替代 `ppt-builder` / `arch-diagram-builder`，而是判型、套品牌、验收、串联发布。

## TL;DR

```
长文定稿 → design-studio 判型 → 子 Skill 生成 → Chrome 预览 → 口播稿 → 发布
```

## 调用

| 平台 | 方式 |
|------|------|
| Cursor | 「自媒体设计」「内容包装」或 `@design-studio` |
| Codex | `$design-studio` + 主题与平台 |

## 三端同步

```bash
cd ~/github/ai-cognition-studio
./scripts/sync-skill.sh design-studio
```

| 角色 | 路径 |
|------|------|
| 源码 | `labs/design-studio/` |
| Cursor | `~/.cursor/skills/design-studio/` |
| Codex | `~/.agents/skills/design-studio/` |

## 目录

```
design-studio/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── deep-thinking.md      # 设计哲学
│   ├── brand-tokens.md         # 品牌三色板
│   ├── platform-specs.md       # 各平台尺寸
│   ├── output-routing.md       # 子 Skill 路由
│   ├── pipeline.md             # 全链路
│   ├── github-ecosystem.md     # 外部项目地图
│   └── script-template.md      # 口播稿模板
└── scripts/
    └── verify-pipeline.mjs     # 系列资产完整性检查
```

## 子 Skill 分工

| Skill | 产出 |
|-------|------|
| **design-studio** | 编排、封面、品牌、pipeline |
| **ppt-builder** | 多页 Keynote HTML |
| **arch-diagram-builder** | 单页步进架构图 |
| **feishu-doc-writer** | 飞书发布 |
| **social-video-toolkit** | 参考视频分析 |

## 延伸阅读

- 方法论：[cognition/08-design-for-self-media.md](../../cognition/08-design-for-self-media.md)
- Playbook：[playbooks/self-media-design.md](../../playbooks/self-media-design.md)
- 口播模板：[docs/presentation/templates/presentation-script-template.md](../../docs/presentation/templates/presentation-script-template.md)

## 验收

```bash
node labs/design-studio/scripts/verify-pipeline.mjs ai-investment
./scripts/sync-skill.sh design-studio
```

1. 新对话：「用 design-studio 帮 AI 投资系列补口播稿大纲」
2. Codex：`$design-studio` 能启动并正确路由到 arch-diagram-builder
