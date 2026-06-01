# Skill 编写 Checklist

> Cursor Agent Skill（`SKILL.md`）编写与维护。模板见 [labs/cursor-skill-template/](../labs/cursor-skill-template/)。

## 何时写 Skill（而非 rule 或 MCP）

- [ ] **重复性工作流**：多步、有固定顺序（如 PR babysit、写 MCP）
- [ ] **需要专门知识**：官方文档链接、仓库内约定、eval 方法
- [ ] **触发可描述**：用户说什么话时应自动加载（description 字段）

## SKILL.md 结构

- [ ] **YAML front matter**：`name`、`description`（第三人称，含触发词）
- [ ] **流程分节**：Overview → Process → 反模式 / 不要做什么
- [ ] **指向仓库内路径**：用相对链接，避免大段复制外部文档
- [ ] **篇幅**：可读性优先；过长则拆 reference 文件

## Description 写法

- [ ] 说明 **做什么** + **何时用**（触发场景）
- [ ] 含用户可能说的关键词
- [ ] 避免与别的 skill 描述重叠导致误触发

## 验收

- [ ] 在新对话中说触发语，Agent 应读取该 skill
- [ ] 按 skill 执行一遍，记录 1 处可改进点
- [ ] 若 skill 依赖 MCP，README 中写清 MCP 配置

## 反模式

- ❌ 把通用代码规范全塞进 skill（应放 rules）
- ❌ 复制整本外部文档进 skill（应链接 + 摘要）
- ❌ description 过宽（「用户问代码时」）导致 always-on 感

---

## 延伸阅读

- Cursor 官方：[Creating Skills](https://cursor.com/docs/context/skills)
- [labs/cursor-skill-template/SKILL.md](../labs/cursor-skill-template/SKILL.md)
