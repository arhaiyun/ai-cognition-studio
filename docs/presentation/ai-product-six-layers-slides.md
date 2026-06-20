---
marp: true
theme: default
paginate: true
size: 16:9
header: ''
footer: 'AI Cognition Studio · AI 副驾实践手记 #6'
style: |
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

  :root {
    --bg: #070a0f;
    --surface: #0f141c;
    --surface-2: #161d28;
    --border: rgba(255,255,255,0.08);
    --text: #f4f6fa;
    --muted: #8b95a8;
    --accent: #4d9fff;
    --l1: #5b9cf5;
    --l2: #34d399;
    --l3: #f59e0b;
    --l4: #a78bfa;
    --l5: #f472b6;
    --l6: #38bdf8;
    --warn: #fb923c;
    --radius: 12px;
    --pad-x: 64px;
    --pad-y: 52px;
  }

  section {
    font-family: 'Noto Sans SC', 'DM Sans', sans-serif;
    background:
      radial-gradient(ellipse 90% 60% at 100% 0%, rgba(77,159,255,0.07), transparent 55%),
      radial-gradient(ellipse 70% 50% at 0% 100%, rgba(52,211,153,0.04), transparent 50%),
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px),
      var(--bg);
    background-size: 100% 100%, 100% 100%, 56px 56px, 56px 56px, 100% 100%;
    color: var(--text);
    padding: var(--pad-y) var(--pad-x);
    font-size: 22px;
    line-height: 1.55;
    letter-spacing: 0.01em;
    justify-content: flex-start;
  }

  section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--l2), var(--accent), var(--l4));
    opacity: 0.85;
  }

  h1, h2, h3, h4 { font-weight: 600; letter-spacing: -0.02em; margin: 0; }
  h1 { font-size: 1.55em; line-height: 1.25; color: var(--text); }
  h2 { font-size: 1.15em; color: var(--text); margin-bottom: 0.35em; }
  h3 { font-size: 0.82em; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1em; }
  p { margin: 0.4em 0; }
  strong { color: #fff; font-weight: 600; }
  em { color: var(--accent); font-style: normal; font-weight: 500; }
  ul, ol { margin: 0.5em 0; padding-left: 1.1em; }
  li { margin: 0.35em 0; color: #c8d0dc; }
  li::marker { color: var(--accent); }
  blockquote { margin: 0; padding: 0; border: none; }
  code {
    font-family: 'DM Sans', ui-monospace, monospace;
    font-size: 0.78em;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.12em 0.45em;
    color: var(--l2);
  }
  table { border-collapse: collapse; width: 100%; font-size: 0.72em; margin-top: 0.5em; }
  th {
    background: rgba(255,255,255,0.04);
    color: var(--muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.85em;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    text-align: left;
  }
  td {
    padding: 11px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: top;
    color: #d0d7e2;
  }
  tr:last-child td { border-bottom: none; }

  /* ── Cover ── */
  section.cover {
    justify-content: center;
    text-align: left;
    padding: 72px var(--pad-x);
  }
  section.cover::before { height: 4px; }
  section.cover h1 {
    font-size: 2.35em;
    font-weight: 700;
    line-height: 1.18;
    max-width: 820px;
    margin-bottom: 0.45em;
  }
  section.cover .cover-accent { color: var(--accent); display: block; }
  section.cover .cover-meta {
    margin-top: 2.2em;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    font-size: 0.72em;
    color: var(--muted);
  }
  section.cover .cover-meta span {
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255,255,255,0.03);
  }
  section.cover .cover-tagline {
    margin-top: 1.4em;
    font-size: 0.88em;
    color: var(--muted);
    max-width: 560px;
    line-height: 1.6;
  }

  /* ── Section divider ── */
  section.section {
    justify-content: center;
    padding-left: calc(var(--pad-x) + 8px);
  }
  section.section .sec-num {
    font-family: 'DM Sans', sans-serif;
    font-size: 4.5em;
    font-weight: 700;
    color: rgba(77,159,255,0.15);
    line-height: 1;
    margin-bottom: 0.15em;
  }
  section.section h1 { font-size: 1.85em; margin-bottom: 0.3em; }
  section.section p { color: var(--muted); font-size: 0.82em; max-width: 520px; }

  /* ── Statement / Quote ── */
  section.statement {
    justify-content: center;
    text-align: center;
    padding: 64px 96px;
  }
  section.statement .stmt-pre {
    font-size: 0.78em;
    color: var(--muted);
    margin-bottom: 1.2em;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  section.statement h1 {
    font-size: 1.65em;
    font-weight: 600;
    line-height: 1.45;
    max-width: 780px;
    margin: 0 auto;
  }
  section.statement .stmt-arrow {
    font-size: 1.8em;
    color: var(--accent);
    margin: 0.6em 0;
    opacity: 0.7;
  }
  section.statement .stmt-highlight {
    font-size: 1.05em;
    color: var(--accent);
    font-weight: 600;
  }

  /* ── Cards & grids ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 0.6em; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 0.6em; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 0.8em; }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 22px;
    height: 100%;
  }
  .card-label {
    font-size: 0.62em;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.7em;
  }
  .card-title {
    font-size: 0.92em;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.55em;
    line-height: 1.35;
  }
  .card-body {
    font-size: 0.72em;
    color: #a8b2c3;
    line-height: 1.55;
  }
  .card-body li { font-size: 1em; margin: 0.28em 0; }

  .card.accent-blue { border-top: 3px solid var(--l1); }
  .card.accent-green { border-top: 3px solid var(--l2); }
  .card.accent-amber { border-top: 3px solid var(--l3); }
  .card.accent-purple { border-top: 3px solid var(--l4); }
  .card.accent-pink { border-top: 3px solid var(--l5); }
  .card.accent-cyan { border-top: 3px solid var(--l6); }

  /* ── Agenda ── */
  .agenda-list { margin-top: 0.8em; }
  .agenda-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .agenda-item:last-child { border-bottom: none; }
  .agenda-num {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.4em;
    font-weight: 700;
    color: var(--accent);
    opacity: 0.55;
    min-width: 36px;
    line-height: 1.2;
  }
  .agenda-text { font-size: 0.82em; color: #dce2ec; padding-top: 4px; }
  .agenda-text strong { color: #fff; }

  /* ── Flow strip ── */
  .flow {
    margin: 1em 0 1.1em;
    padding: 14px 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: 'DM Sans', ui-monospace, monospace;
    font-size: 0.68em;
    color: var(--l2);
    letter-spacing: 0.02em;
    text-align: center;
  }

  /* ── Layer slides ── */
  section.layer { padding-top: 44px; }
  .layer-top {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 0.9em;
  }
  .layer-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px; height: 52px;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95em;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .layer-title { font-size: 1.25em; font-weight: 700; color: #fff; line-height: 1.2; }
  .layer-sub { font-size: 0.68em; color: var(--muted); margin-top: 4px; font-weight: 400; }
  .essence {
    margin-top: 1em;
    padding: 12px 18px;
    border-left: 3px solid var(--accent);
    background: rgba(77,159,255,0.06);
    border-radius: 0 var(--radius) var(--radius) 0;
    font-size: 0.75em;
    color: #c5d4e8;
  }
  .essence strong { color: var(--accent); }

  section.layer-l1 .layer-badge { background: linear-gradient(135deg, #3d7fd4, var(--l1)); }
  section.layer-l2 .layer-badge { background: linear-gradient(135deg, #22a86b, var(--l2)); }
  section.layer-l3 .layer-badge { background: linear-gradient(135deg, #d97706, var(--l3)); }
  section.layer-l4 .layer-badge { background: linear-gradient(135deg, #7c5fd4, var(--l4)); }
  section.layer-l5 .layer-badge { background: linear-gradient(135deg, #db5a96, var(--l5)); }
  section.layer-l6 .layer-badge { background: linear-gradient(135deg, #0ea5e9, var(--l6)); }

  /* ── Ladder overview ── */
  .ladder { display: flex; flex-direction: column; gap: 6px; margin-top: 0.5em; }
  .rung {
    display: grid;
    grid-template-columns: 48px 140px 1fr;
    align-items: center;
    gap: 14px;
    padding: 10px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-size: 0.72em;
  }
  .rung-id {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 1.05em;
  }
  .rung-name { font-weight: 600; color: #fff; }
  .rung-desc { color: var(--muted); text-align: right; }
  .rung.l1 { border-left: 4px solid var(--l1); }
  .rung.l2 { border-left: 4px solid var(--l2); }
  .rung.l3 { border-left: 4px solid var(--l3); }
  .rung.l4 { border-left: 4px solid var(--l4); }
  .rung.l5 { border-left: 4px solid var(--l5); }
  .rung.l6 { border-left: 4px solid var(--l6); background: rgba(56,189,248,0.06); }

  /* ── Human levels ── */
  .level-card {
    text-align: center;
    padding: 18px 12px;
  }
  .level-card .lv {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .level-card .lv-label { font-size: 0.62em; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
  .level-card .lv-quote { font-size: 0.68em; color: #dce2ec; line-height: 1.45; }

  /* ── Path ── */
  .path {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin-top: 1.2em;
  }
  .path-step {
    flex: 1;
    text-align: center;
    padding: 22px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
  }
  .path-step:first-child { border-radius: var(--radius) 0 0 var(--radius); }
  .path-step:last-child { border-radius: 0 var(--radius) var(--radius) 0; }
  .path-step .ps-lv { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1.1em; margin-bottom: 6px; }
  .path-step .ps-text { font-size: 0.62em; color: var(--muted); line-height: 1.4; }
  .path-arrow {
    display: flex;
    align-items: center;
    color: var(--muted);
    font-size: 0.9em;
    padding: 0 2px;
    opacity: 0.4;
  }

  /* ── Resources ── */
  .res-list { margin-top: 0.6em; }
  .res-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 0.78em;
  }
  .res-item:last-child { border-bottom: none; }
  .res-name { color: #dce2ec; font-weight: 500; }
  .res-path { color: var(--muted); font-family: 'DM Sans', monospace; font-size: 0.88em; }

  /* ── Slide title bar ── */
  .slide-head { margin-bottom: 1em; }
  .slide-head h2 { font-size: 1.2em; }
  .slide-head p { font-size: 0.72em; color: var(--muted); margin-top: 6px; }

  /* ── Footer override ── */
  section footer {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: rgba(139,149,168,0.55);
    letter-spacing: 0.04em;
  }

  section[data-marpit-pagination]::after {
    color: rgba(139,149,168,0.4);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
  }
---

<!-- _class: cover -->

# 会用 AI 写代码
<span class="cover-accent">≠ 会做 AI 产品</span>

<p class="cover-tagline">区分 Building 与 Runtime · AI 应用六层成熟度 · 人的能力 L3→L6</p>

<div class="cover-meta">
<span>AI 副驾实践手记 · 连载 #6</span>
<span>AI Cognition Studio</span>
<span>2026</span>
</div>

---

<!-- _class: section -->

<div class="sec-num">01</div>

# 今天讲什么

五个问题，一张成熟度地图

---

<div class="agenda-list">

<div class="agenda-item">
<div class="agenda-num">1</div>
<div class="agenda-text"><strong>Building vs Runtime</strong> — 什么才算 AI 产品</div>
</div>

<div class="agenda-item">
<div class="agenda-num">2</div>
<div class="agenda-text"><strong>AI 应用六层</strong> — L1 → L6 成熟度地图</div>
</div>

<div class="agenda-item">
<div class="agenda-num">3</div>
<div class="agenda-text"><strong>人的能力四档</strong> — Consumer → Architect</div>
</div>

<div class="agenda-item">
<div class="agenda-num">4</div>
<div class="agenda-text"><strong>自检框架</strong> — 你的项目在哪一层</div>
</div>

<div class="agenda-item">
<div class="agenda-num">5</div>
<div class="agenda-text"><strong>学习路径</strong> — 从 L3 到 L6 怎么走</div>
</div>

</div>

<p style="margin-top:1.4em;font-size:0.62em;color:var(--muted)">参考 · Superlinear Academy · AI产品的六个层次</p>

---

<!-- _class: statement -->

<p class="stmt-pre">一个常见误会</p>

# 用 Cursor / Claude Code<br/>做出了网页、插件、小工具

<p class="stmt-arrow">↓</p>

<p class="stmt-highlight">「我已经会做 AI 产品了」</p>

---

<!-- _class: section -->

<div class="sec-num">02</div>

# 先区分两件事

判断标准只有一个

---

<div class="slide-head">
<h2>Building vs Runtime</h2>
<p>不看开发时有没有用 AI · 看用户使用时 AI 是否参与任务执行</p>
</div>

<div class="grid-2">

<div class="card accent-blue">
<div class="card-label">AI-assisted Building</div>
<div class="card-title">开发过程中</div>
<div class="card-body">
<ul>
<li>AI 帮你写代码</li>
<li>例：Cursor 写的普通日历 App</li>
<li>用户打开 App 时，AI 不在场</li>
</ul>
</div>
</div>

<div class="card accent-green">
<div class="card-label">AI Runtime · AI Product</div>
<div class="card-title">用户使用产品时</div>
<div class="card-body">
<ul>
<li>读上下文 · 调工具 · 判断 · 执行 · 记忆</li>
<li>例：邮件助手读信 → 生成 → 调 API → 确认 → 发送</li>
<li>AI 承担 runtime 任务执行的一部分</li>
</ul>
</div>
</div>

</div>

---

<!-- _class: section -->

<div class="sec-num">03</div>

# AI 应用六层

自下而上 · 成熟度递增

---

<div class="slide-head">
<h2>六层总览</h2>
<p>每一层解决不同问题 · 不是「越复杂越好」</p>
</div>

<div class="ladder">

<div class="rung l6"><span class="rung-id" style="color:var(--l6)">L6</span><span class="rung-name">AI-native System</span><span class="rung-desc">AI 是系统的智能层</span></div>
<div class="rung l5"><span class="rung-id" style="color:var(--l5)">L5</span><span class="rung-name">Agentic Core</span><span class="rung-desc">Model as controller</span></div>
<div class="rung l4"><span class="rung-id" style="color:var(--l4)">L4</span><span class="rung-name">LLM Workflow</span><span class="rung-desc">AI inside controlled process</span></div>
<div class="rung l3"><span class="rung-id" style="color:var(--l3)">L3</span><span class="rung-name">Tool-using AI</span><span class="rung-desc">Model as interface to tools</span></div>
<div class="rung l2"><span class="rung-id" style="color:var(--l2)">L2</span><span class="rung-name">Grounded AI / RAG</span><span class="rung-desc">知道更多，仍主要回答</span></div>
<div class="rung l1"><span class="rung-id" style="color:var(--l1)">L1</span><span class="rung-name">Prompt Wrapper</span><span class="rung-desc">Model as a feature</span></div>

</div>

---

<!-- _class: layer layer-l1 -->

<div class="layer-top">
<span class="layer-badge">L1</span>
<div>
<div class="layer-title">Prompt Wrapper</div>
<div class="layer-sub">Model as a feature · 模型当功能</div>
</div>
</div>

<div class="flow">用户输入 → prompt template → LLM → 输出</div>

<div class="grid-2">
<div class="card accent-blue">
<div class="card-label">典型产物</div>
<div class="card-body">标题生成 · 邮件润色 · 简历优化 · 简单聊天机器人</div>
</div>
<div class="card accent-blue">
<div class="card-label">局限</div>
<div class="card-body">无上下文 · 无工具 · 无状态 · 易被 replicate</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · 把 LLM 包装成一个功能，半小时可被复制</div>

---

<!-- _class: layer layer-l2 -->

<div class="layer-top">
<span class="layer-badge">L2</span>
<div>
<div class="layer-title">Grounded AI / RAG</div>
<div class="layer-sub">知道更多，仍主要回答</div>
</div>
</div>

<div class="flow">问题 → 检索 KB/DB → rerank → 拼接上下文 → LLM → citation</div>

<div class="grid-2">
<div class="card accent-green">
<div class="card-label">典型产物</div>
<div class="card-body">知识库问答 · 客服 FAQ · 课程助教 · 内部 SOP</div>
</div>
<div class="card accent-green">
<div class="card-label">技术重点</div>
<div class="card-body">chunking · hybrid search · 权限检索 · 引用 · 降幻觉</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · 重点不在 prompt，而在检索与 grounding</div>

---

<!-- _class: layer layer-l3 -->

<div class="layer-top">
<span class="layer-badge">L3</span>
<div>
<div class="layer-title">Tool-using AI</div>
<div class="layer-sub">Model as interface to tools</div>
</div>
</div>

<div class="flow">目标 → LLM 选工具 → function call → 结果 → 继续</div>

<div class="grid-2">
<div class="card accent-amber">
<div class="card-label">典型产物</div>
<div class="card-body">查日历 · 读 Gmail · 更新 CRM · 生成文件 · 跑代码</div>
</div>
<div class="card accent-amber">
<div class="card-label">技术重点</div>
<div class="card-body">tool schema · auth · 参数校验 · 执行前确认 · 错误处理</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · 模型是工具和系统的自然语言入口 — 长「手脚」了</div>

---

<!-- _class: layer layer-l4 -->

<div class="layer-top">
<span class="layer-badge">L4</span>
<div>
<div class="layer-title">LLM Workflow</div>
<div class="layer-sub">AI inside controlled process</div>
</div>
</div>

<div class="flow">分类 → 检索 → 抽取 → 调 API → 生成 → 人工确认 → 执行 → eval</div>

<div class="grid-2">
<div class="card accent-purple">
<div class="card-label">典型产物</div>
<div class="card-body">退款审核 · 合同初审 · 候选人筛选 · bug triage · 舆情日报</div>
</div>
<div class="card accent-purple">
<div class="card-label">为何重要</div>
<div class="card-body">路径明确 · 可预测 · 知道哪步必须人审<br/>Anthropic：L5 Builder 的主战场</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · Workflow — 可控流程里的 AI，不是自由发挥的 Agent</div>

---

<!-- _class: layer layer-l5 -->

<div class="layer-top">
<span class="layer-badge">L5</span>
<div>
<div class="layer-title">Agentic Core</div>
<div class="layer-sub">Model as controller</div>
</div>
</div>

<div class="flow">Goal → Plan → Act → Observe → Update → Continue / Stop / Ask human</div>

<div class="grid-2">
<div class="card accent-pink">
<div class="card-label">核心组件</div>
<div class="card-body">planner · tool registry · memory · RAG · guardrails · eval · tracing · HITL</div>
</div>
<div class="card accent-pink">
<div class="card-label">行业定义</div>
<div class="card-body">OpenAI / Google：<strong>Agent</strong> — 模型控制任务执行循环</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · 从「回答」到「控制执行」的跃迁</div>

---

<!-- _class: layer layer-l6 -->

<div class="layer-top">
<span class="layer-badge">L6</span>
<div>
<div class="layer-title">AI-native System</div>
<div class="layer-sub">AI 是系统的智能层 · Building what you can't buy</div>
</div>
</div>

<div class="grid-3">
<div class="card accent-cyan">
<div class="card-label">低摩擦交互</div>
<div class="card-body">inline edit · sidebar · approval UI · HITL</div>
</div>
<div class="card accent-cyan">
<div class="card-label">上下文智能</div>
<div class="card-body">profile · workspace · RAG · long-term memory · 权限</div>
</div>
<div class="card accent-cyan">
<div class="card-label">主动智能</div>
<div class="card-body">cron · webhook · event trigger · agent runner</div>
</div>
</div>

<div class="essence"><strong>本质</strong> · AI 不再是一个功能，而是系统的智能层</div>

---

<!-- _class: section -->

<div class="sec-num">04</div>

# 人的能力

L3 Consumer → L6 Architect

---

<div class="slide-head">
<h2>四档能力对照</h2>
<p>你在哪一层，决定了 AI 在你工作中的角色</p>
</div>

| | 关键词 | 你在做什么 | AI 角色 |
|:--:|--------|------------|---------|
| **L3** | Chatting | 问 AI、用答案 | 咨询师 |
| **L4** | One-off | AI coding 做 demo | 外包 |
| **L5** | Reliability | 构建可靠 workflow | 逻辑引擎 |
| **L6** | Orchestration | 设计 AI 系统架构 | 系统控制层 |

---

<!-- _class: statement -->

<p class="stmt-pre">四句话记牢</p>

<div class="grid-4" style="text-align:left;margin-top:0.5em">

<div class="card accent-blue level-card">
<div class="lv" style="color:var(--l1)">L3</div>
<div class="lv-label">Consumer</div>
<div class="lv-quote">我会问 AI</div>
</div>

<div class="card accent-amber level-card">
<div class="lv" style="color:var(--l3)">L4</div>
<div class="lv-label">Tinkerer</div>
<div class="lv-quote">我会让 AI 帮我做一个东西</div>
</div>

<div class="card accent-purple level-card">
<div class="lv" style="color:var(--l4)">L5</div>
<div class="lv-label">Builder</div>
<div class="lv-quote">我会把 AI 放进可靠流程</div>
</div>

<div class="card accent-cyan level-card">
<div class="lv" style="color:var(--l6)">L6</div>
<div class="lv-label">Architect</div>
<div class="lv-quote">我会设计 AI 驱动的系统</div>
</div>

</div>

---

<div class="slide-head">
<h2>L5 Builder · 三项硬功夫</h2>
<p>从 demo 到可靠，差的不只是 prompt</p>
</div>

<div class="grid-3">

<div class="card accent-purple">
<div class="card-label">01</div>
<div class="card-title">Context Engineering</div>
<div class="card-body">Context window 是工作台，不是垃圾桶<br/>让模型在正确时间看到正确信息</div>
</div>

<div class="card accent-purple">
<div class="card-label">02</div>
<div class="card-title">Evaluation</div>
<div class="card-body">定义质量标准 · 分类准确率 · 误批率 · 结构稳定性<br/>没有 eval，就没有可靠性</div>
</div>

<div class="card accent-purple">
<div class="card-label">03</div>
<div class="card-title">Iterative Mindset</div>
<div class="card-body">持续迭代 prompt · workflow · retrieval · tool schema · HITL 节点</div>
</div>

</div>

---

<div class="slide-head">
<h2>L6 Architect · 三项架构能力</h2>
<p>不是「更复杂」，而是复杂得有理由</p>
</div>

<div class="grid-3">

<div class="card accent-cyan">
<div class="card-label">01</div>
<div class="card-title">System Resilience</div>
<div class="card-body">retry · fallback · validation · escalation · observability</div>
</div>

<div class="card accent-cyan">
<div class="card-label">02</div>
<div class="card-title">Contextual Architecture</div>
<div class="card-body">working / long-term / transactional memory 的分层设计</div>
</div>

<div class="card accent-cyan">
<div class="card-label">03</div>
<div class="card-title">Orchestration</div>
<div class="card-body">何时 workflow · 何时 agent · 何时 multi-agent · 何时交给人</div>
</div>

</div>

---

<!-- _class: section -->

<div class="sec-num">05</div>

# 定位你的项目

三个快问

---

<div class="grid-3">

<div class="card accent-blue">
<div class="card-label">Question 1</div>
<div class="card-title">用户使用时，AI 有没有参与？</div>
<div class="card-body">没有 → AI-assisted building<br/>有 → 进入 AI product 范畴</div>
</div>

<div class="card accent-green">
<div class="card-label">Question 2</div>
<div class="card-title">AI 只会回答，还是会行动？</div>
<div class="card-body">只回答 → L1–L2<br/>用工具 → L3<br/>进流程 → L4<br/>循环执行 → L5</div>
</div>

<div class="card accent-cyan">
<div class="card-label">Question 3</div>
<div class="card-title">有没有系统级能力？</div>
<div class="card-body">memory · 权限 · eval · 主动触发<br/>→ 接近 L6</div>
</div>

</div>

<p style="margin-top:1.2em;font-size:0.65em;color:var(--muted)">完整版 · 文章中的 10 问自检框架</p>

---

<div class="slide-head">
<h2>学习路径</h2>
<p>不必一上来就做 multi-agent</p>
</div>

<div class="path">
<div class="path-step">
<div class="ps-lv" style="color:var(--l1)">L3</div>
<div class="ps-text">高质量<br/>用模型</div>
</div>
<div class="path-arrow">→</div>
<div class="path-step">
<div class="ps-lv" style="color:var(--l3)">L4</div>
<div class="ps-text">AI coding<br/>快速原型</div>
</div>
<div class="path-arrow">→</div>
<div class="path-step">
<div class="ps-lv" style="color:var(--l4)">L5</div>
<div class="ps-text">workflow · RAG<br/>eval · HITL</div>
</div>
<div class="path-arrow">→</div>
<div class="path-step">
<div class="ps-lv" style="color:var(--l6)">L6</div>
<div class="ps-text">orchestration<br/>memory · runtime</div>
</div>
</div>

---

<!-- _class: statement -->

<p class="stmt-pre">真正的终点</p>

# 不是「我会用 AI」

<p class="stmt-arrow">而是</p>

<p class="stmt-highlight">我能设计一个 AI 系统<br/>让它在真实世界里可靠地替我工作</p>

---

<div class="slide-head">
<h2>资源 & Q&A</h2>
<p>演示时可 live demo 交互架构图</p>
</div>

<div class="res-list">

<div class="res-item">
<span class="res-name">完整文章</span>
<span class="res-path">cognition/02-ai-product-six-layers.md</span>
</div>

<div class="res-item">
<span class="res-name">交互架构图</span>
<span class="res-path">docs/diagrams/ai-product-six-layers.html</span>
</div>

<div class="res-item">
<span class="res-name">5 分钟视频全稿</span>
<span class="res-path">docs/video/ai-product-six-layers-5min-full-script.md</span>
</div>

<div class="res-item">
<span class="res-name">原文</span>
<span class="res-path">Superlinear Academy</span>
</div>

</div>

<p style="margin-top:1.6em;font-size:1.1em;font-weight:600;color:var(--accent);text-align:center">Q & A</p>
