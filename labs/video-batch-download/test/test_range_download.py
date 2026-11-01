import hashlib
import importlib.util
import re
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


MODULE = Path(__file__).resolve().parents[1] / "scripts" / "range_download.py"
spec = importlib.util.spec_from_file_location("range_download", MODULE)
transport = importlib.util.module_from_spec(spec)
spec.loader.exec_module(transport)


class RangeTransportTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.output = Path(self.temp.name) / "video.mp4"
        self.data = bytes(range(251)) * 8
        self.ranges = []
        self.mode = "normal"
        self.failed_once = False
        owner = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def do_GET(self):
                request_range = self.headers.get("Range", "")
                owner.ranges.append(request_range)
                match = re.fullmatch(r"bytes=(\d+)-(\d+)", request_range)
                if not match:
                    self.send_error(400)
                    return
                start, end = map(int, match.groups())
                end = min(end, len(owner.data) - 1)
                if owner.mode == "ignore":
                    self.send_response(200)
                    self.send_header("Content-Length", str(len(owner.data)))
                    self.end_headers()
                    self.wfile.write(owner.data)
                    return
                if start == 256 and owner.mode in ("retry", "pause"):
                    if owner.mode == "pause" or not owner.failed_once:
                        owner.failed_once = True
                        self.send_error(503)
                        return
                payload = owner.data[start:end + 1]
                reported_start = start + 1 if owner.mode == "wrong" and end > 0 else start
                self.send_response(206)
                self.send_header("ETag", '"fixture-v1"')
                self.send_header("Content-Range", f"bytes {reported_start}-{end}/{len(owner.data)}")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.url = f"http://127.0.0.1:{self.server.server_port}/video"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.temp.cleanup()

    def download(self, **kwargs):
        return transport.download(
            self.url, self.output, chunk_size=256, workers=1, timeout=1,
            expected_sha256=hashlib.sha256(self.data).hexdigest(), **kwargs,
        )

    def test_assembles_exact_bytes_and_verifies_hash(self):
        result = self.download()
        self.assertEqual(self.output.read_bytes(), self.data)
        self.assertEqual(result["bytes"], len(self.data))
        self.assertEqual(result["sha256"], hashlib.sha256(self.data).hexdigest())
        self.assertTrue(all(int(x.split("-")[1]) - int(x.split("=")[1].split("-")[0]) < 256 for x in self.ranges))

    def test_retries_a_failed_range_without_duplicating_bytes(self):
        self.mode = "retry"
        self.download(attempts=2)
        self.assertEqual(self.output.read_bytes(), self.data)
        self.assertEqual(self.ranges.count("bytes=256-511"), 2)

    def test_wrong_content_range_never_publishes_final_file(self):
        self.mode = "wrong"
        with self.assertRaises(transport.DownloadError):
            self.download(attempts=1)
        self.assertFalse(self.output.exists())

    def test_server_ignoring_range_is_rejected(self):
        self.mode = "ignore"
        with self.assertRaises(transport.DownloadError):
            self.download(attempts=1)
        self.assertFalse(self.output.exists())

    def test_wrong_final_hash_never_publishes_model(self):
        with self.assertRaises(transport.DownloadError):
            transport.download(self.url, self.output, chunk_size=256, workers=1,
                               timeout=1, attempts=1, expected_sha256="0" * 64)
        self.assertFalse(self.output.exists())

    def test_resume_reuses_verified_completed_chunks(self):
        self.mode = "pause"
        with self.assertRaises(transport.DownloadError):
            self.download(attempts=1)
        self.assertFalse(self.output.exists())
        self.mode = "normal"
        self.ranges.clear()
        self.download(attempts=1)
        self.assertEqual(self.output.read_bytes(), self.data)
        self.assertNotIn("bytes=0-255", self.ranges)


if __name__ == "__main__":
    unittest.main()
