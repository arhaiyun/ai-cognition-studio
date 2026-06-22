---
title: AI 投资研究 · 中篇：美股分层标的与财报指标
date: 2026-06-21
status: stable
audience: [self, dev, general]
tags: [cognition, investment, us-equities, hyperscaler, earnings]
summary: 美股 AI 七层代表标的、Capex/云增速/RPO 等关键财报指标、按层跟踪清单。
series:
  id: ai-investment-2026
  title: AI 智能革命投资研究
  part: 2
  slot: pillar
diagram:
  src: diagrams/ai-industry-chain-players.html
  title: 产业链中美代表公司 · 点击层级
  height: 520
related:
  - cognition/04-ai-investment-part1-seven-layers.md
  - cognition/06-ai-investment-part3-a-share-agent.md
  - cognition/07-ai-investment-part4-risks.md
---

# AI 投资研究 · 中篇：美股分层标的与财报指标

> **TL;DR**：美股 AI 不是只买 NVDA。按**七层栈**配置，用 **Capex、云增速、RPO** 三类指标验证「故事是否变成收入」。

**系列**：[上篇](04-ai-investment-part1-seven-layers.md) · **中篇** · [下篇](06-ai-investment-part3-a-share-agent.md) · [风险](07-ai-investment-part4-risks.md)

---

## 1 · 美股分层标的（每层 5 家代表）

> 产业链映射，非荐股。完整矩阵见文首 [交互图](../diagrams/ai-industry-chain-players.html)（点层级看中美对照）。

| 层 | 代表标的 | 角色 |
|----|----------|------|
| **① 制造设备** | TSMC, ASML, AMAT, Lam Research, KLA | 供给天花板；扩产节奏决定全链 |
| **② 芯片存储** | NVDA, AMD, Broadcom, Micron, Intel | 训练+推理；ASIC 分流 inference |
| **③ 互连网络** | Arista, Cisco, Astera Labs, Marvell, Coherent | 算力密度↑ → 网络价值↑ |
| **④ AIDC** | Vertiv, Equinix, Digital Realty, Eaton, GE Vernova | 液冷+电力配套直接受益 |
| **⑤ 能源** | NextEra, Quanta Services, Emerson, Schneider, Vistra | Power Wall 订单驱动 |
| **⑥ 云/模型** | MSFT, GOOGL, AMZN, META, ORCL | **Capex 发动机 + 变现枢纽** |
| **⑦ 应用** | PLTR, CRM, NOW, ADBE, UBER | 看 workflow 嵌入与 ARR |

### 配置思路（框架，非仓位建议）

| 风格 | 侧重层 | 逻辑 |
|------|--------|------|
| 偏确定 | ①–④ + ⑥ | 订单可见、跟 hyperscaler capex |
| 偏弹性 | ⑦ | 收入拐点，波动大 |
| 分散 | SMH/SOXX ETF + ⑥ 龙头 | 降低单一芯片监管/竞争风险 |

---

## 2 · 三类核心财报指标

### 2.1 Capex（资本开支）——「发动机转速」

**看谁**：MSFT、GOOGL、AMZN、META（+ ORCL 近年弹性大）

**看什么**：

| 指标 | 含义 | 警惕信号 |
|------|------|----------|
| Capex 同比/环比 | 基建是否加速 | 指引下调 |
| AI 占 Capex 比例 | 是否真投 AI | 口头 AI、实际维护性资本 |
| Capex / Revenue | 投资强度 | 长期 >30% 且收入不跟 |
| 自由现金流 FCF | 可持续性 | Capex 吞噬 FCF 多个季度 |

**2025–2026 背景**：四大 hyperscaler 合计 capex 达 **$600B+ 量级**（市场共识区间）。若 2026 指引仍上修，①–④ 层订单能见度偏高；若砍指引，全链杀估值。

---

### 2.2 云增速（Cloud Revenue Growth）——「变现温度计」

**看谁**：Azure（MSFT）、Google Cloud（GOOGL）、AWS（AMZN）

**看什么**：

| 指标 | 含义 | 健康参考 |
|------|------|----------|
| 云收入 YoY | AI 是否拉动云再加速 | 维持或回升 |
| AI 贡献定性描述 | 管理层是否给 AI 单列 | 从「实验」到「百分点贡献」 |
| 毛利率趋势 | AI infra 是否压毛利 | 短期承压可接受，需看规模效应 |

**关键问题**：云增速若 **跌破 ~20%** 且管理层下调指引，则「capex 能回本」叙事动摇——这是全系列最核心的**早期预警**之一。

---

### 2.3 RPO / Backlog（剩余履约义务）——「未来收入蓄水池」

**看谁**：MSFT、CRM、NOW、ORCL、PLTR 等企业软件与云

**看什么**：

| 指标 | 含义 | 用法 |
|------|------|------|
| **RPO 总额** | 已签约未确认收入 | 增速 > 收入增速 = 未来景气 |
| Current RPO | 12 个月内转化 | 短周期景气 |
| Billings / cRPO | 当季签约质量 | 季末冲量需甄别 |
| **Backlog**（AVGO 等） | 芯片订单能见度 | AI 收入 backlog 增速 |

**Agent 时代**：关注是否披露 **AI ARR / Copilot seats / Agent transactions**——从「RPO 含 AI 模块」到「AI 单独产品线」是商业化拐点信号。

---

## 3 · 按层跟踪清单（季报季用）

### 芯片层 ②
- [ ] NVDA Data Center 收入及指引  
- [ ] AVGO AI revenue / AI backlog  
- [ ] AMD Data Center 份额与毛利  
- [ ] MU HBM 产能与定价  

### 配套层 ③④⑤
- [ ] Vertiv 订单与 backlog（液冷）  
- [ ] Arista 云巨头资本开支相关性  
- [ ] EQIX/DLR 上架率、新机房投产  

### 云层 ⑥
- [ ] 四大 capex 指引  
- [ ] Azure / AWS / GCP 增速  
- [ ] FCF 与 share buyback 是否收缩  

### 应用层 ⑦
- [ ] CRM Agentforce / NOW AI 产品收入口径  
- [ ] PLTR AIP 客户数与大单  
- [ ] 毛利率与 S&M 效率（是否真降本增效）  

---

## 4 · 中篇结论

1. **美股 alpha** 仍在「卖铲 + 收租」：芯片定价权、云分发、电力配套  
2. **财报验证顺序**：Capex 指引 → 云增速 → RPO/AI ARR  
3. **应用层** 进入选股时代，用 RPO 和 AI 产品线拆账，别只看 PS  

下篇：A 股 CSP 产业链地图 + Agent 兑现案例。

---

## 修订

| 日期 | 变更 |
|------|------|
| 2026-06-21 | v0.1 中篇：美股分层 + Capex/云/RPO |

**免责声明**：不构成证券买卖建议；标的名仅供产业链学习。
