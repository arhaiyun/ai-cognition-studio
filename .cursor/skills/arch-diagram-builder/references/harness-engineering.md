# Harness Engineering · arch-diagram-builder

借鉴 Cursor [agent harness](https://cursor.com/blog/continually-improving-agent-harness) 的 **evaluation-first**：先定义「好图」的可验证标准，再改 Skill，用离线脚本回归 + 人工看图验收。

## 什么叫「好图」（本 Skill 的 Good）

| 维度 | 可自动检查 | 需人工看 |
|------|------------|----------|
| 结构合规 | CSS Token、STEPS、path 连线、粒子、键盘 | — |
| 叙事 | 步数 6–9 | 每步是否只亮相关组件 |
| 布线 | 无 `<line id=conn-*>` | 双向线是否分车道、不堆叠 |
| 语义 | — | 五色是否用对、架构是否胡编 |
| 美观 | — | 标签位置、分区是否清晰 |

**原则**：能写脚本的用脚本；主观质量靠「打开 HTML 步进一遍」。

## 离线回归（每次改 Skill 或出新图后跑）

```bash
# 1. 验证已有标杆图
node labs/arch-diagram-builder/scripts/verify-diagram.mjs \
  docs/diagrams/ai-agent-dev-system.html

# 2. 验证新生成的图
node labs/arch-diagram-builder/scripts/verify-diagram.mjs \
  docs/diagrams/your-new-diagram.html
```

退出码 `0` = 结构检查全过；非 0 时 JSON 里看 `checks` 哪项失败。

### verify-diagram.mjs 检查项

- 零外链依赖（无 http(s) script/link）
- 设计 Token（blu/pur/grn/org/cya/bd）
- SVG viewBox、STEPS 数组、步数范围
- 连线用 `<path id=conn-*>` 而非 `<line>`
- `animateMotion` + `mpath`、键盘步进、重置

## Eval 用例集

`evals/evals.json` 含 3 个生成任务 + 5 条触发词测试：

| Eval | 测什么 |
|------|--------|
| rag-pipeline-five-steps | 标准 5 节点流水线 |
| mcp-protocol-bidirectional | 双向连线 + 分车道 |
| minimal-two-node-smoke | 最小 smoke |

**跑 eval 流程**（手动或 Agent）：

1. 用 Skill 执行 `evals.json` 里每条 `prompt`
2. 对产出 HTML 跑 `verify-diagram.mjs`
3. 浏览器 `open` 逐步点击，记录箭头/叙事问题
4. 失败则改 `SKILL.md` / `references/path-routing.md`，再跑一轮

工作区建议：`arch-diagram-builder-workspace/iteration-N/eval-<name>/`

## 迭代 Skill 时改哪里

| 问题现象 | 优先改 |
|----------|--------|
| 箭头堆叠 | `path-routing.md` + SKILL 布线步骤 |
| 缺粒子/动画 | `design-system.md` 粒子段 |
| 一步亮太多 | SKILL「一步一动作」+ 范例 steps |
| 颜色语义乱 | `design-system.md` 五色表 |
| Skill 不触发 | `description` 加触发词；跑 `trigger_evals` |

改完后：

```bash
./scripts/sync-skill.sh arch-diagram-builder
node labs/arch-diagram-builder/scripts/verify-diagram.mjs docs/diagrams/ai-agent-dev-system.html
```

## 与 Studio 集成验收

```bash
cd studio && npm run content:build
npm run dev
# 文章 diagram frontmatter 能否嵌入 + 全屏打开
```

## 反模式

- ❌ 只改图不改 Skill → 下次生成仍犯同样错
- ❌ 只靠 eyeball 不跑 verify → 结构回归漏检
- ❌ eval 只测「能打开」→ 应测双向布线、步进叙事
