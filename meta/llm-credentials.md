---
title: LLM 凭证统一管理
date: 2026-06-14
status: stable
audience: [self, dev]
tags: [meta, llm, credentials, deepseek]
summary: 全仓库 LLM API Key 与 Profile 的唯一维护入口；密钥存 .private/，注册表存 meta/llm-providers.yaml。
---

# LLM 凭证统一管理

> **TL;DR**：本仓库为**公开项目**。API Key **绝不入库**；每人本机维护 `.private/llm-credentials.env`。公开的是 profile 注册表与接入文档。

---

## 文件分工

| 文件 | 是否入库 | 作用 |
|------|----------|------|
| [`.private/llm-credentials.env`](../.private/llm-credentials.env) | **否**（gitignore） | 真实 API Key，**唯一写入点** |
| [`meta/llm-credentials.env.example`](llm-credentials.env.example) | 是 | 模板，新环境 `cp` 后填 Key |
| [`meta/llm-providers.yaml`](llm-providers.yaml) | 是 | Profile 注册（无密钥）：端点、模型、环境变量名 |
| [`cognition/01-domestic-llm-integration.md`](../cognition/01-domestic-llm-integration.md) | 是 | 厂商接入说明与场景选型 |

---

## 首次配置

```bash
cp meta/llm-credentials.env.example .private/llm-credentials.env
# 编辑 .private/llm-credentials.env，填入各 profile 的 API Key
```

验证（不调用 API）：

```bash
python3 scripts/llm_env.py --profile deepseek-media-agent --check
```

---

## Profile 命名规范

```
{provider}-{用途}
```

示例：

| profile id | 用途 |
|------------|------|
| `deepseek-media-agent` | 媒体 / 灵感整理 |
| `qwen-default` | 通义千问通用 |
| `kimi-longdoc` | Kimi 长文档 |

---

## 新增一个模型 / Profile

1. 在 **`meta/llm-credentials.env.example`** 增加环境变量块（仅变量名，无真实 Key）
2. 在 **`meta/llm-providers.yaml`** 的 `profiles` 下追加条目
3. 在 **`cognition/01-domestic-llm-integration.md`** 补充厂商说明（若为新厂商）
4. 在 **`.private/llm-credentials.env`** 填入真实 Key
5. Agent README 中注明 `used_by` 使用的 profile

---

## 当前已注册 Profile

见 [`llm-providers.yaml`](llm-providers.yaml)。默认：`deepseek-media-agent`。

| Profile | Provider | 使用者 |
|---------|----------|--------|
| `deepseek-media-agent` | DeepSeek | inspiration-curator |

---

## 在代码中使用

```python
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
from llm_env import load_credentials, get_client_config

load_credentials()
cfg = get_client_config("deepseek-media-agent")
# cfg.api_key, cfg.base_url, cfg.model
```

或 CLI：

```bash
python3 scripts/llm_env.py --profile deepseek-media-agent --check
```

---

## 安全说明（公开仓库）

本仓库 **公开可见**，因此：

| 做法 | 是否允许 |
|------|----------|
| commit `meta/llm-providers.yaml`、`.env.example` 模板 | ✅ |
| commit `.private/llm-credentials.env` 或任何含 `sk-` 的文件 | ❌ **禁止** |
| 在 Issue / PR / 聊天中粘贴 Key | ❌ 泄露后请立即轮换 |

- Key **只**放在 `.private/llm-credentials.env`（已 gitignore，仅本机）
- Fork 本仓库的他人需自行申请 Key，复制 `meta/llm-credentials.env.example` 到 `.private/`
- CI 若需调用模型，用 GitHub Actions **Repository Secrets**，不读 `.private/`
- 已核对：当前 git 历史中**未**包含 API Key

**你曾在对话中粘贴过 Key，建议在 DeepSeek 控制台轮换**，并只更新本机 `.private/llm-credentials.env`。

---

## 关联

- [国产大模型接入说明](../cognition/01-domestic-llm-integration.md)
- [inspiration-curator](../agents/inspiration-curator/)
