#!/usr/bin/env python3
"""统一加载 LLM 凭证与 Profile 配置。"""

from __future__ import annotations

import argparse
import os
import sys
from dataclasses import dataclass
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

REPO_ROOT = Path(__file__).resolve().parent.parent
CREDENTIALS_FILE = REPO_ROOT / ".private" / "llm-credentials.env"
PROVIDERS_FILE = REPO_ROOT / "meta" / "llm-providers.yaml"


@dataclass
class LlmConfig:
    profile: str
    provider: str
    label: str
    api_key: str
    base_url: str
    model: str


def load_credentials() -> None:
    if not load_dotenv:
        return
    if CREDENTIALS_FILE.exists():
        load_dotenv(CREDENTIALS_FILE)
    root_env = REPO_ROOT / ".env"
    if root_env.exists():
        load_dotenv(root_env)


def _load_providers() -> dict:
    if not PROVIDERS_FILE.exists():
        return {}
    raw = PROVIDERS_FILE.read_text(encoding="utf-8")
    if yaml:
        data = yaml.safe_load(raw) or {}
        return data.get("profiles", {})
    raise RuntimeError("请安装 PyYAML: pip install pyyaml")


def get_client_config(profile: str | None = None) -> LlmConfig:
    load_credentials()
    data = yaml.safe_load(PROVIDERS_FILE.read_text(encoding="utf-8"))
    default = data.get("default_profile", "deepseek-media-agent")
    profile_id = profile or os.getenv("LLM_DEFAULT_PROFILE", default)
    profiles = data.get("profiles", {})
    if profile_id not in profiles:
        raise KeyError(f"未知 profile: {profile_id}，见 meta/llm-providers.yaml")

    p = profiles[profile_id]
    env_map = p["env"]
    defaults = p.get("defaults", {})

    api_key = os.getenv(env_map["api_key"], "")
    base_url = os.getenv(env_map["base_url"], defaults.get("base_url", ""))
    model = os.getenv(env_map["model"], defaults.get("model", ""))

    return LlmConfig(
        profile=profile_id,
        provider=p.get("provider", ""),
        label=p.get("label", profile_id),
        api_key=api_key,
        base_url=base_url,
        model=model,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="LLM 统一凭证工具")
    parser.add_argument("--profile", help="Profile id，默认读 LLM_DEFAULT_PROFILE")
    parser.add_argument("--check", action="store_true", help="检查配置是否齐全（不调用 API）")
    args = parser.parse_args()

    if not yaml:
        print("错误: 需要 PyYAML，请 pip install pyyaml", file=sys.stderr)
        sys.exit(1)

    try:
        cfg = get_client_config(args.profile)
    except KeyError as e:
        print(f"错误: {e}", file=sys.stderr)
        sys.exit(1)

    if args.check:
        ok = bool(cfg.api_key and cfg.base_url and cfg.model)
        print(f"profile:  {cfg.profile}")
        print(f"label:    {cfg.label}")
        print(f"provider: {cfg.provider}")
        print(f"base_url: {cfg.base_url}")
        print(f"model:    {cfg.model}")
        print(f"api_key:  {'✓ 已设置' if cfg.api_key else '✗ 未设置'}")
        if not CREDENTIALS_FILE.exists():
            print(f"\n提示: 复制 meta/llm-credentials.env.example → .private/llm-credentials.env")
        sys.exit(0 if ok else 1)

    print(cfg)


if __name__ == "__main__":
    main()
