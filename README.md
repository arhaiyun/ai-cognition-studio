# AI Cognition Studio

个人 AI 学习与认知工作室：沉淀 **认知框架**、**深度思考**、**播客笔记**，以及可 fork 的 **Mini 项目**（MCP、Skills、Agent 工作流）。

> 中文为主 · 公开知识库 · 草稿在本地 `.private/`（不入库）

---

## 适合谁读

| 读者 | 在这里能找到什么 |
|------|------------------|
| **未来的我** | 学习路线、未定论题草稿迁移后的成稿、实验记录 |
| **开发者同行** | 可运行的 `labs/`、MCP/Skill checklist、工程化技巧 |
| **AI 爱好者** | 认知地图、播客 takeaway、入门可读的框架文 |

---

## 三大支柱

| 支柱 | 目录 | 说明 |
|------|------|------|
| **思** | [`cognition/`](cognition/) · [`essays/`](essays/) | AI 认知构建、深度长文、读书/论文笔记 |
| **听** | [`podcast/`](podcast/) | 播客外链 + 摘要卡片（不托管音频） |
| **做** | [`labs/`](labs/) · [`agents/`](agents/) · [`playbooks/`](playbooks/) | Mini 项目、Sub-Agent 实践与 checklist |

---

## Studio 导航门户

Markdown 知识库的可视化阅读入口，位于 [`studio/`](studio/)：

```bash
cd studio
npm install
npm run dev    # 打开 http://127.0.0.1:5173
```

构建时扫描各目录 Markdown，生成静态索引；`src/generated/` 不入库，由 `npm run content:build` 或 CI 生成。

---

## 快速导航

- [学习路线图](meta/learning-roadmap.md)
- [Labels 说明](meta/labels.md)
- [写作与 Lab 规范](CONTRIBUTING.md)
- [Agent 编写 Checklist](playbooks/agent-authoring-checklist.md)
- [MCP 设计 Checklist](playbooks/mcp-design-checklist.md)
- [Skill 编写 Checklist](playbooks/skill-authoring-checklist.md)
- [Skill 三端同步（Cursor + Codex + Studio）](playbooks/skill-dual-install.md)

### Agents（Sub-Agent 实践）

| 路径 | 说明 |
|------|------|
| [`agents/`](agents/) | 应用 Sub-Agent 工作区（`scripts/new-agent.sh` 创建） |
| [`agents/registry.yaml`](agents/registry.yaml) | Sub-Agent 注册表 |

### Labs

| Lab | 说明 |
|-----|------|
| [mcp-hello](labs/mcp-hello/) | 最小 MCP Server（Python FastMCP） |
| [cursor-skill-template](labs/cursor-skill-template/) | Cursor Skill 模板 |
| [project-incubator](labs/project-incubator/) | 项目 0→1 孵化 Skill（PRD → UED Demo → 实现 Prompt） |
| [studio-skill-sync](labs/studio-skill-sync/) | Skill 三端同步（Cursor + Codex + Studio） |
| [prompt-patterns](labs/prompt-patterns/) | 可复用 Prompt 模式 |

---

## 本地跑 Labs

```bash
git clone https://github.com/arhaiyun/ai-cognition-studio.git
cd ai-cognition-studio

# Python lab 示例
cd labs/mcp-hello
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

各 lab 详见子目录 `README.md`。

---

## 草稿政策

未完成内容请放在 **`.private/`**（已 gitignore），定稿后再迁入 `cognition/`、`essays/`、`labs/` 等公开目录。

建议本地结构：

```
.private/
├── drafts/    # 文章草稿
├── ideas/     # 选题池
└── scratch/   # 临时笔记
```

---

## License

- 代码：[MIT](LICENSE)
- 文章：默认 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（可在 front matter 中另行标注）

---

## 关联项目

量化交易系统等其它仓库独立维护，仅在文末互相链接，不共享目录。
