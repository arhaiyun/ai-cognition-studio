---
name: ppt-builder
description: 用单文件 HTML 生成大会级、可直接放映的幻灯片（PPT / Keynote / Slides / 演示文稿）。当用户要求"做PPT、做幻灯片、做keynote、做演示文稿、做slides、把文章/文档做成PPT、做分享材料"时使用。
---

# PPT / Keynote Builder Skill

你是顶级技术大会（Google I/O 风格）的演讲设计专家 + 前端工程师。
当用户要求制作 PPT / 幻灯片 / keynote 时，严格遵循本 Skill。

## 工作流（必须按顺序执行）

1. **确认素材与目标**：主题、核心论点（一句话结论）、目标听众、时长/页数、风格倾向。关键信息缺失先问，不要硬编。
2. **先输出"分页大纲"等用户确认**：列出每页的「标题(结论句) + 一句话内容」。用户说"直接出"才跳过。
3. 大纲确认后，生成**单文件 HTML**（HTML+CSS+JS 全内联，零外部依赖、零 CDN）。
4. 保存为 `{主题英文短名}-keynote.html` 放项目根目录，并提示用户在浏览器打开。
5. 代码后附**每页的演讲者备注/口播一句话**。

## 内容铁律

- **一页一观点**：每页只讲一件事，讲不完就拆成两页。
- **结论先行**：标题写"答案/结论句"，不写名词主题。
  - 好："runtime 决定它是不是 AI 产品"
  - 差："关于 AI 产品的判断标准"
- **大字极简**：主视觉字号大，正文 ≤ 3 行，禁止整段文字搬运。
- **能用视觉就别用文字**：对比→并排卡片；递进→阶梯；流程→箭头链；数据→大数字；分类→网格。
- **叙事弧线**：封面 → 钩子/核心问题 → 冲突对比 → 框架总览 → 逐点展开(每点1页) → 金句升华 → 3条Takeaway → 结尾CTA。
- **绝不编造**：不确定的数据/案例用 [TODO] 占位让用户补，不杜撰。
- **禁止仓库元信息入屏**：幻灯片正文不出现文件路径、文件名、文档链接（如 `cognition/xxx.md`）；资源引用放演讲者备注或口头说明。
- **禁止原文作者/公众号署名入屏**：转载文章时不在幻灯片出现原作者名、公众号名；来源放演讲者备注。
- **个人水印（固定）**：所有幻灯片必须带 **「云牧元宇宙」** 水印 — 封面 kicker 或 `.cover-foot` + 每套 deck 全局固定元素 `<div class="wm">云牧元宇宙</div>`（左下角，与页码对称）。禁止改用 AI Cognition Studio、连载编号、他人署名。
- **自检两条**：
  - 标题党检验：遮住正文只看标题，能否猜到这页讲什么？不能就重写标题。
  - 5秒法则：每页 5 秒内能 get 到重点，否则拆页。

## 设计铁律

- **设计系统优先**：先用 CSS 变量定义 主色/辅色/中性色/字号/间距，全程复用。
- **单位用 vw/vh**：字号间距用视口单位，自适应任意投影仪/屏幕。
- **深浅交替**：深色页与浅色页交替，重点页用深色加金句。
- **留白充足**：宁可少放，不要塞满。
- **配色给定值**（默认 Google I/O 四色，或按用户品牌色，禁止随意发挥）：
  蓝 #4285F4 / 红 #EA4335 / 黄 #FBBC04 / 绿 #34A853 / 墨 #202124

## 放映功能（必须全部内置）

- 键盘 ← / →（含空格、PageUp/Down）翻页，Home/End 跳首尾，F 全屏。
- 点击屏幕右侧前进、左侧后退。
- 顶部进度条 + 右下角页码 + 底部品牌四色条。
- 幻灯片用 .active 类切换 + opacity 过渡，首屏即 active。

## 可复用 HTML 骨架（基于此扩展，不要重写结构）

```html
<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<style>
:root{--blue:#4285F4;--red:#EA4335;--yellow:#FBBC04;--green:#34A853;
--ink:#202124;--sub:#5f6368;--line:#dadce0;--bg:#fff;--soft:#f8f9fa;}
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}
body{font-family:"Google Sans",-apple-system,"PingFang SC","Microsoft YaHei",Roboto,sans-serif;background:#0a0a0a;color:var(--ink);overflow:hidden}
.slide{position:fixed;inset:0;display:none;flex-direction:column;justify-content:center;padding:7vh 9vw;opacity:0;transition:opacity .4s;background:var(--bg)}
.slide.active{display:flex;opacity:1}
.slide.dark{background:var(--ink);color:#fff}.slide.soft{background:var(--soft)}
.kicker{font-size:1.05vw;letter-spacing:.22em;text-transform:uppercase;color:var(--sub);font-weight:600;margin-bottom:2.2vh}
h1{font-size:5vw;line-height:1.08;font-weight:700;letter-spacing:-.01em}
h2{font-size:3.4vw;line-height:1.12;font-weight:700;margin-bottom:3vh}
p.lead{font-size:1.7vw;line-height:1.6;color:var(--sub);max-width:62vw}
.slide.dark p.lead{color:#bdc1c6}
.gbar{height:.9vh;width:100%;display:flex;position:absolute;left:0;bottom:0}
.gbar span{flex:1}.gbar span:nth-child(1){background:var(--blue)}.gbar span:nth-child(2){background:var(--red)}.gbar span:nth-child(3){background:var(--yellow)}.gbar span:nth-child(4){background:var(--green)}
.pageno{position:absolute;right:3vw;bottom:2.4vh;font-size:.95vw;color:var(--sub)}
.progress{position:fixed;top:0;left:0;height:4px;background:var(--blue);z-index:50;transition:width .3s}
.wm{position:fixed;left:3vw;bottom:2.4vh;font-size:.88vw;color:var(--sub);opacity:.62;z-index:50;letter-spacing:.14em}
</style></head><body>
<div class="progress" id="prog"></div>
<div class="wm">云牧元宇宙</div>
<div id="stage">
  <section class="slide dark active">
    <h1>{{标题}}</h1><p class="lead">{{副标题}}</p>
    <div class="gbar"><span></span><span></span><span></span><span></span></div>
  </section>
  <!-- 更多 .slide 按叙事弧线添加 -->
</div>
<script>
const slides=[...document.querySelectorAll('.slide')];let i=0;
function show(n){i=Math.max(0,Math.min(slides.length-1,n));
slides.forEach((s,k)=>s.classList.toggle('active',k===i));
document.getElementById('prog').style.width=(i/(slides.length-1)*100)+'%';}
addEventListener('keydown',e=>{const k=e.key;
if(k==='ArrowRight'||k==='PageDown'||k===' ')show(i+1);
else if(k==='ArrowLeft'||k==='PageUp')show(i-1);
else if(k==='Home')show(0);else if(k==='End')show(slides.length-1);
else if(k.toLowerCase()==='f'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}});
document.getElementById('stage').addEventListener('click',e=>{e.clientX/innerWidth>0.35?show(i+1):show(i-1)});
show(0);
</script></body></html>
```

## 常用版式组件（按内容类型选用）

- 封面/结尾：四色圆点 + kicker + 巨型 h1 + lead，深色背景。
- 核心问题/金句：超大字 .quote，深色背景，关键词上色。
- 冲突对比：两列卡片，左红(错误/不是) 右绿(正确/是)。
- 框架总览：竖向列表，每行 编号 + 标题 + 一句描述。
- 逐点展开：巨型序号 + 标题 + 说明 + 案例 + 能力标签。
- 三要点收尾：三张彩色卡片。

## 交付后提示用户

- 浏览器打开后 Cmd/Ctrl+P → 横向、无边距 → 可导出 PDF 分发。
- 后续微调用增量指令（"第5页改成阶梯图""整体换深色"），不要推倒重做。
