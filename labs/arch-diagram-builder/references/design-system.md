# 设计系统（固定不变）

生成架构图时**严格遵守**，不得更改 Token、组件语义与动画机制。

## 整体结构

- 页面 100vw × 100vh，白色背景 `#FFFFFF`
- 顶部固定导航栏 56px（标题 + 右上角 badge）
- 主图区域：SVG，`viewBox` 建议 900–960 宽 × 480–540 高
- 底部步骤控制栏 88px：步骤描述 + 进度点 + 上一步/下一步/重置

## CSS Token

```css
--bg: #FFFFFF;   --sf: #FFFFFF;   --sf2: #EEF0F5;  --bd: #B0B8C8;
--blu: #1558D6;  --pur: #6D28D9;  --grn: #047857;
--org: #C2410C;  --cya: #0369A1;
--tx: #0D1117;   --mt: #374151;
```

## 节点（Node）

- SVG `<rect>`，`rx=12`，白色填充，`stroke: #B0B8C8`，`stroke-width: 2`
- 默认阴影：`filter: drop-shadow(0 2px 8px rgba(0,0,0,.10))`
- 激活态（JS 动态设置）：
  - `fill`: 对应颜色 10% 透明度
  - `stroke`: 对应颜色实色，`stroke-width: 2.5`
  - `filter`: `drop-shadow(0 4px 10px rgba(R,G,B,.28))`
- 节点内可放 Chip：`rx=20` 小圆角矩形 + 文字
- Chip 激活类：`.lit-b` / `.lit-p` / `.lit-g` / `.lit-o` / `.lit-c`

## 颜色与语义

| 代码 | 色值 | 语义 |
|------|------|------|
| B 蓝 | `#1558D6` | 用户入口、请求/响应、对外接口 |
| P 紫 | `#6D28D9` | 核心智能层（LLM、Agent、推理） |
| G 绿 | `#047857` | 数据存储、记忆、状态持久化 |
| O 橙 | `#C2410C` | 工具执行、动作、外部调用 |
| C 青 | `#0369A1` | 可观测性、监控、日志、评估 |

## 分区（Zone）

- SVG `<rect>`，`rx=16`，`stroke-dasharray: 5 4`，无填充或 4% 颜色填充
- 标签：`font-size: 9.5px`，`font-weight: 700`，`letter-spacing: .12em`，`text-transform: uppercase`

## 连接线（Connection）

- SVG `<path>`，`stroke-width: 2.5`，`stroke-dasharray: 8 5`
- 默认 `opacity: 0.3`；激活后 `opacity: 1`
- 激活加 `.fwd`（正向流动）或 `.bwd`（反向流动）
- 箭头用 SVG `<marker>`，每种颜色一个
- **必须用 `<path>` 而非 `<line>`**（粒子动画依赖）

```css
@keyframes dashFwd { to { stroke-dashoffset: -26; } }
@keyframes dashBwd { to { stroke-dashoffset: 26; } }
.conn.fwd { opacity: 1; animation: dashFwd .6s linear infinite; }
.conn.bwd { opacity: 1; animation: dashBwd .6s linear infinite; }
```

## 粒子（Particle）

每条连接线一对粒子：实心点（r=4~5）+ 发光晕圈（r=8~10）。

- SVG `<circle>` 置于 SVG 内
- `<animateMotion>` + `<mpath href="#path-id"/>`
- 参数：`begin="indefinite"` `fill="freeze"` `keyPoints="0;1"` `keyTimes="0;1"` `calcMode="linear"`
- JS：`animElement.beginElement()`；结束后 `opacity=0`
- 实心粒子：连线颜色 + `stroke="white" stroke-width="2"`
- 晕圈：`feGaussianBlur stdDeviation=3`

## 步骤（Step）数据结构

```javascript
{
  title: '步骤短标题（显示在导航与顺序条）',
  html: '底部说明，顺序相关用 ①② 或「步骤 N」前缀',
  nodes: { runtime: 'P', api: 'B' },
  conns: { 'conn-api-runtime': 'fwd' },
  labels: ['lbl-context-runtime'],
  chips: { 'chip-plan': 'P' },
  particles: ['api-runtime'],
}
```

## 执行顺序可视化（必须）

凡涉及**先后次序、流水线、循环阶段**的要点，**必须在动态流程图上标注**，不能只在口播/正文里讲：

| 元素 | 作用 |
|------|------|
| **flow-strip** | 顶栏下横条：1 请求 → 2 路由 → … 全链路顺序 |
| **nav-order** | 导航区「步骤 N/M · 标题」 |
| **order-badge** | 节点左上角顺序号圆标（done / active） |
| **conn-order** | 当前步连线旁「步骤 N · 语义」 |
| **html 文案** | 底部说明用 ①② 与步骤一致 |

每步 `STEPS[i]` 与顺序 UI 一一对应；并行步骤（如 Memory + Observability）共用同一步序号并同时高亮。

## 键盘快捷键

- → / Space：下一步
- ←：上一步
- R：重置

## JS 引擎要点

- `COLORS` 映射 B/P/G/O/C → fill/stroke/rgb
- `resetAll()` 每步前清空激活态
- `goTo(-1)` 初始态显示引导文案
- 节点组 id：`node-{id}`，内层 `.node` 为 rect
- 连线 id：`conn-{from}-{to}`，粒子 id：`p-{key}` / `pg-{key}` / `am-p-{key}`
