import assert from "node:assert/strict";
import test from "node:test";
import { selectPortfolioContents } from "./portfolio.js";

test("selectPortfolioContents filters ordinary content and sorts selected work", () => {
  const selected = selectPortfolioContents([
    { slug: "ordinary" },
    { slug: "third", portfolio: { order: 3 } },
    { slug: "first", portfolio: { order: 1 } },
    { slug: "second", portfolio: { order: 2 } },
  ]);

  assert.deepEqual(
    selected.map((item) => item.slug),
    ["first", "second", "third"],
  );
});

test("selectPortfolioContents does not mutate the content index order", () => {
  const contents = [
    { slug: "second", portfolio: { order: 2 } },
    { slug: "first", portfolio: { order: 1 } },
  ];

  selectPortfolioContents(contents);

  assert.deepEqual(
    contents.map((item) => item.slug),
    ["second", "first"],
  );
});
