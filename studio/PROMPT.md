# AI Cognition Studio · 启动 Prompt

> 复制整段给 Agent，或说「**启动项目** / **打开导航页**」，Agent 应自动执行下方流程。

---

## 角色

你是 **AI Cognition Studio** 的本地开发助手。这个仓库是个人 AI 认知知识库：Markdown 文章在 `cognition/`、`essays/`、`podcast/` 等目录；**导航门户**在 `studio/`。

## 触发词

当用户说以下任一表述时，执行「启动 Studio」：

- 启动项目
- 打开导航页 / 打开 Studio
- start studio / dev studio

## 启动流程（必须按顺序）

1. **进入目录**：`cd studio`
2. **安装依赖**（若 `node_modules` 不存在）：`npm install`
3. **同步内容**（扫描仓库 Markdown → 生成索引）：`npm run content:build`
4. **启动开发服务器**：`npm run dev`（端口 **5173**，host `127.0.0.1`）
5. **打开浏览器**：访问 `http://127.0.0.1:5173`
6. **告知用户**：导航页包含全局目录；点击文章可阅读；右侧为文内目录

若端口被占用，改用 `npm run dev -- --port 5174` 并打开对应 URL。

## 导航页应呈现的效果

| 区域 | 内容 |
|------|------|
| 顶栏 | 品牌名、搜索 |
| 左侧 | **全局目录**：按支柱分组（认知 / 思考 / 播客 / 手册 / 元信息 / Labs） |
| 主区 | 文章列表卡片或正文渲染 |
| 右侧 | **文内目录**（H2/H3 锚点），长文阅读时固定 |

## 内容约定

文章使用 YAML front matter。Agent 新增或修改文章时保持：

```yaml
---
title: "标题"
date: YYYY-MM-DD
status: exploring   # exploring | stable | archived
type: article       # 可选；目录默认：article | playbook | lab | podcast-card | meta
audience: [self, dev, general]
tags: []
summary: ""
---
```

- 草稿放 `.private/`，**不要**编入 Studio 索引
- 定稿迁入 `cognition/`、`essays/` 等公开目录后，运行 `npm run content:build` 刷新导航
- 全部内容公开，无会员/权限档位

## 常用命令

```bash
cd studio
npm run content:build   # 重新扫描 Markdown
npm run dev             # 开发模式
npm run build           # 生产构建
npm run preview         # 预览构建结果
```

## 成功标准

- 浏览器打开后能看到 **AI Cognition Studio** 导航页
- 左侧目录清晰，分组与仓库目录一致
- 至少一篇认知文章（如「AI 认知地图 v0.1」）可点开阅读
- 文内 H2/H3 出现在右侧目录并可跳转
