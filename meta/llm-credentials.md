---
title: LLM 凭证统一管理
date: 2026-06-14
status: stable
audience: [self, dev]
tags: [meta, llm, credentials, deepseek]
summary: 全仓库 LLM API Key 与 Profile 的唯一维护入口；密钥存 .private/，注册表存 meta/llm-providers.yaml。
---

# LLM 凭证统一管理

> **TL;DR**：**一个 env 文件存密钥**，**一个 yaml 存 profile 元数据**，**一篇接入说明**（[`cognition/01-domestic-llm-integration.md`](../cognition/01-domestic-llm-integration.md)）存厂商文档。Agent / Lab 只引用 profile id，不各自维护 Key。

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

## 安全说明

- **即使 GitHub 私有仓库，也不要把 Key commit 进 git**（历史难清理、误公开、CI 日志泄露）
- Key 只放在 `.private/llm-credentials.env`（已 gitignore）
- 若 Key 曾在聊天 / 截图中暴露，建议在平台 **轮换** 后更新 env 文件
- CI 使用 GitHub Actions **Secrets**，不读 `.private/`

---

## 关联

- [国产大模型接入说明](../cognition/01-domestic-llm-integration.md)
- [inspiration-curator](../agents/inspiration-curator/)
