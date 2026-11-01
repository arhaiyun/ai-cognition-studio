#!/usr/bin/env python3
"""Fetch public Xiaohongshu HTML without a browser profile or account cookies."""

import json
import sys
from urllib.parse import urlsplit

import requests


def main():
    url = sys.argv[1]
    host = urlsplit(url).hostname
    if host not in {"www.xiaohongshu.com", "xiaohongshu.com", "xhslink.com", "xhslink.cn"}:
        raise ValueError("Expected a public Xiaohongshu share URL")
    with requests.get(url, timeout=(5, 8), stream=True, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    }) as response:
        response.raise_for_status()
        body = bytearray()
        for chunk in response.iter_content(65536):
            body.extend(chunk)
            if len(body) > 4 * 1024 * 1024:
                raise ValueError("Public page exceeds the HTML size limit")
        print(json.dumps({"url": response.url, "html": body.decode("utf-8", "replace")}))


if __name__ == "__main__":
    main()
