import assert from "node:assert/strict";
import test from "node:test";
import { XiaohongshuParser } from "../scripts/platforms/xiaohongshu.js";

const id = "0123456789abcdef01234567";
const source = `https://www.xiaohongshu.com/explore/${id}?xsec_token=public-fixture`;
const note = { noteId: id, type: "video", title: "Public video", user: {}, video: {
  duration: 12000, media: { stream: { h264: [{ masterUrl: "https://sns-video-v2.xhscdn.com/fixture.mp4", width: 720, height: 1280 }] } },
} };
const html = (map) => `<script>window.__INITIAL_STATE__=${JSON.stringify({ note: { noteDetailMap: map } })}</script>`;

test("public HTML binds the requested note even when a recommendation comes first", () => {
  const parser = new XiaohongshuParser();
  const result = parser._parsePublicHtml(html({ other: { note: { ...note, noteId: "other" } }, [id]: { note } }), source, source);
  assert.equal(result.noteId, id);
});

test("public HTML never substitutes an unrelated recommended note", () => {
  const parser = new XiaohongshuParser();
  assert.equal(parser._parsePublicHtml(html({ other: { note: { ...note, noteId: "other" } } }), source, source), null);
  assert.equal(parser._parsePublicHtml(html({ [id]: { note: { ...note, noteId: "different" } } }), source, source), null);
});

test("a public SSR video can be parsed without starting a browser or login flow", async () => {
  const parser = new XiaohongshuParser();
  parser._fetchPublicNote = async () => ({ note, resolvedUrl: source });
  const result = await parser.parse({ start: () => { throw new Error("browser must not start"); } }, source, {});
  assert.equal(result.videoId, id);
  assert.equal(result.sourceUrl, source);
  assert.equal(result.mediaStreams[0].url, note.video.media.stream.h264[0].masterUrl);
  assert.equal(result.mediaStreams[0].downloadMode, "range");
});

test("a public note with an empty title uses its caption for a readable title", async () => {
  const parser = new XiaohongshuParser();
  parser._fetchPublicNote = async () => ({ note: { ...note, title: "", desc: "A useful caption\nMore detail" }, resolvedUrl: source });
  const result = await parser.parse({}, source, {});
  assert.equal(result.title, "A useful caption");
});
