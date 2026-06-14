# Agent 编写 Checklist

> 新建 `agents/<name>/` Sub-Agent 时逐项勾选。

## 定义

- [ ] **单点职责**：一句话说清「只做什么」
- [ ] **触发词明确**：SKILL front matter `description` 覆盖用户会怎么说
- [ ] **输出格式固定**：文档 / 代码 / checklist / JSON 等可预期

## 文件

- [ ] `README.md` — front matter + TL;DR + 安装步骤 + 局限
- [ ] `SKILL.md` — name 与目录名一致（kebab-case）
- [ ] `agents/openai.yaml` — Codex `display_name`、`default_prompt`
- [ ] 已登记 [`agents/registry.yaml`](../agents/registry.yaml)

## 运行时

- [ ] 已测试 Cursor：`~/.cursor/skills/<name>/`
- [ ] 已测试 Codex：`~/.agents/skills/<name>/`
- [ ] `allow_implicit_invocation: false`（除非确需自动触发）

## 安全

- [ ] 无真实密钥；需密钥则提供 `.env.example`
- [ ] 不可逆操作有确认步骤
- [ ] 不写死绝对路径（用 `~/github/ai-cognition-studio/...` 或相对路径）

## 组合（可选）

- [ ] 在 README 注明与其他 Agent / Lab 的关系
- [ ] `registry.yaml` 填写 `depends_on` / `triggers`

## 发布

- [ ] `status: exploring` → 稳定后改 `stable`
- [ ] `cd studio && npm run content:build` 刷新 Studio 索引
