#!/usr/bin/env python3
"""DeepSeek 灵感整理 Demo — 理解零散输入并输出结构化 Markdown."""

from __future__ import annotations

import argparse
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

try:
    from openai import OpenAI
except ImportError:
    print("请先安装依赖: pip install -r requirements.txt", file=sys.stderr)
    sys.exit(1)

TOOLS_DIR = Path(__file__).resolve().parent
AGENT_DIR = TOOLS_DIR.parent
REPO_ROOT = AGENT_DIR.parent.parent
REFERENCES = AGENT_DIR / "references"


def load_env() -> None:
    if load_dotenv:
        load_dotenv(TOOLS_DIR / ".env")
        load_dotenv(REPO_ROOT / ".env")


def read_input(args: argparse.Namespace) -> str:
    if args.text:
        return args.text.strip()
    if args.file:
        return Path(args.file).read_text(encoding="utf-8").strip()
    if not sys.stdin.isatty():
        return sys.stdin.read().strip()
    print("错误: 请提供灵感文字、-f 文件或 pipe stdin", file=sys.stderr)
    sys.exit(1)


def load_system_prompt() -> str:
    path = REFERENCES / "system-prompt.md"
    base = path.read_text(encoding="utf-8") if path.exists() else ""
    schema_path = REFERENCES / "output-schema.md"
    schema = schema_path.read_text(encoding="utf-8") if schema_path.exists() else ""
    return f"{base}\n\n---\n\n请严格按以下输出 schema 回复（Markdown）：\n\n{schema}"


def slugify(text: str, max_len: int = 40) -> str:
    s = re.sub(r"[^\w\u4e00-\u9fff]+", "-", text.lower()).strip("-")
    return (s[:max_len] or "inspiration").strip("-")


def call_deepseek(raw_input: str) -> str:
    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if not api_key:
        print(
            "错误: 未设置 DEEPSEEK_API_KEY\n"
            "请 cp .env.example .env 并填入 Key，或 export DEEPSEEK_API_KEY=...",
            file=sys.stderr,
        )
        sys.exit(1)

    base_url = os.environ.get("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
    model = os.environ.get("DEEPSEEK_MODEL", "deepseek-v4-flash")

    client = OpenAI(api_key=api_key, base_url=base_url)
    system = load_system_prompt()
    user_msg = (
        f"请整理以下日常灵感输入。\n\n"
        f"---\n{raw_input}\n---\n\n"
        f"今日日期：{datetime.now(timezone.utc).strftime('%Y-%m-%d')}"
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        temperature=0.4,
    )
    return response.choices[0].message.content or ""


def save_inbox(content: str, raw_input: str) -> Path:
    inbox = REPO_ROOT / ".private" / "inbox"
    inbox.mkdir(parents=True, exist_ok=True)
    title_line = content.split("\n", 1)[0] if content else raw_input[:30]
    slug = slugify(title_line.replace("#", "").strip())
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    path = inbox / f"{date}-{slug}.md"
    path.write_text(content.strip() + "\n", encoding="utf-8")
    return path


def main() -> None:
    parser = argparse.ArgumentParser(description="DeepSeek 灵感整理 Demo")
    parser.add_argument("text", nargs="?", help="灵感文字")
    parser.add_argument("-f", "--file", help="从文件读取")
    parser.add_argument("--save", action="store_true", help="保存到 .private/inbox/")
    parser.add_argument("--dry-run", action="store_true", help="只检查配置，不调用 API")
    args = parser.parse_args()

    load_env()
    raw = read_input(args)

    if args.dry_run:
        print("✓ 配置 OK（未调用 API）")
        print(f"  输入长度: {len(raw)} 字")
        return

    result = call_deepseek(raw)
    print(result)

    if args.save:
        path = save_inbox(result, raw)
        print(f"\n---\n✓ 已保存: {path}", file=sys.stderr)


if __name__ == "__main__":
    main()
