import importlib.util
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).with_name("curate.py")
SPEC = importlib.util.spec_from_file_location("inspiration_curator", MODULE_PATH)
curate = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(curate)


class InspectOutputSchemaTest(unittest.TestCase):
    def test_reports_no_missing_headings_for_complete_output(self):
        output = """
# 灵感整理 · 作品集

## 核心灵感
内容
## 主题与标签
内容
## 类型判断
内容
## 澄清问题
内容
## 建议下一步
内容
## 结构化摘要
内容
## 原文
内容
"""

        self.assertEqual(curate.inspect_output_schema(output), [])

    def test_reports_missing_required_headings(self):
        output = "# 灵感整理 · 作品集\n\n## 核心灵感\n内容\n"

        self.assertEqual(
            curate.inspect_output_schema(output),
            ["主题与标签", "类型判断", "澄清问题", "建议下一步", "结构化摘要", "原文"],
        )


class InboxFilenameTest(unittest.TestCase):
    def test_builds_stable_filename_from_output_title(self):
        filename = curate.build_inbox_filename(
            "# 灵感整理 · AI 作品集转型\n\n正文",
            "原始输入",
            "2026-06-19",
        )

        self.assertEqual(filename, "2026-06-19-灵感整理-ai-作品集转型.md")


if __name__ == "__main__":
    unittest.main()
