#!/usr/bin/env python3
"""DeepSeek 灵感整理 Demo — 理解零散输入并输出结构化 Markdown."""

from __future__ import annotations

import argparse
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
SCRIPTS_DIR = REPO_ROOT / "scripts"
REQUIRED_OUTPUT_HEADINGS = [
    "核心灵感",
    "主题与标签",
    "类型判断",
    "澄清问题",
    "建议下一步",
    "结构化摘要",
    "原文",
]

if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))


def load_env() -> None:
    try:
        from llm_env import load_credentials

        load_credentials()
    except ImportError:
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


def inspect_output_schema(content: str) -> list[str]:
    headings = {
        match.group(1).strip()
        for match in re.finditer(r"^##\s+(.+?)\s*$", content, flags=re.MULTILINE)
    }
    return [heading for heading in REQUIRED_OUTPUT_HEADINGS if heading not in headings]


def build_inbox_filename(content: str, raw_input: str, date: str) -> str:
    title_line = content.split("\n", 1)[0] if content else raw_input[:30]
    slug = slugify(title_line.replace("#", "").strip())
    return f"{date}-{slug}.md"


def call_deepseek(raw_input: str, profile: str | None = None) -> str:
    from llm_env import get_client_config

    try:
        cfg = get_client_config(profile)
    except KeyError as e:
        print(f"错误: {e}", file=sys.stderr)
        sys.exit(1)

    if not cfg.api_key:
        print(
            "错误: 未设置 API Key\n"
            "请 cp meta/llm-credentials.env.example .private/llm-credentials.env 并填入 Key",
            file=sys.stderr,
        )
        sys.exit(1)

    client = OpenAI(api_key=cfg.api_key, base_url=cfg.base_url)
    system = load_system_prompt()
    user_msg = (
        f"请整理以下日常灵感输入。\n\n"
        f"---\n{raw_input}\n---\n\n"
        f"今日日期：{datetime.now(timezone.utc).strftime('%Y-%m-%d')}"
    )

    response = client.chat.completions.create(
        model=cfg.model,
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
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    path = inbox / build_inbox_filename(content, raw_input, date)
    path.write_text(content.strip() + "\n", encoding="utf-8")
    return path


def main() -> None:
    parser = argparse.ArgumentParser(description="DeepSeek 灵感整理 Demo")
    parser.add_argument("text", nargs="?", help="灵感文字")
    parser.add_argument("-f", "--file", help="从文件读取")
    parser.add_argument("--save", action="store_true", help="保存到 .private/inbox/")
    parser.add_argument("--profile", help="LLM profile id，默认 deepseek-media-agent")
    parser.add_argument("--dry-run", action="store_true", help="只检查配置，不调用 API")
    args = parser.parse_args()

    load_env()
    raw = read_input(args)

    if args.dry_run:
        from llm_env import get_client_config

        cfg = get_client_config(args.profile)
        print("✓ 配置 OK（未调用 API）")
        print(f"  profile: {cfg.profile} ({cfg.label})")
        print(f"  model:   {cfg.model}")
        print(f"  api_key: {'✓ 已设置' if cfg.api_key else '✗ 未设置'}")
        print(f"  输入长度: {len(raw)} 字")
        return

    result = call_deepseek(raw, profile=args.profile)
    print(result)

    missing_headings = inspect_output_schema(result)
    if missing_headings:
        print(
            f"\n警告: 模型输出缺少章节: {', '.join(missing_headings)}",
            file=sys.stderr,
        )

    if args.save:
        path = save_inbox(result, raw)
        print(f"\n---\n✓ 已保存: {path}", file=sys.stderr)


if __name__ == "__main__":
    main()
