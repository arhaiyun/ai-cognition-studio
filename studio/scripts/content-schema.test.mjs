import assert from "node:assert/strict";
import test from "node:test";
import { normalizePortfolio, normalizeSeries } from "./content-schema.mjs";

test("normalizePortfolio returns normalized featured-project metadata", () => {
  assert.deepEqual(
    normalizePortfolio({
      order: 2,
      label: "Agent Workflow",
      outcome: "把碎片输入变成可继续创作的结构化灵感。",
      capabilities: ["Sub-Agent", "Content", "", null],
    }),
    {
      order: 2,
      label: "Agent Workflow",
      outcome: "把碎片输入变成可继续创作的结构化灵感。",
      capabilities: ["Sub-Agent", "Content"],
    },
  );
});

test("normalizePortfolio ignores missing portfolio metadata", () => {
  assert.equal(normalizePortfolio(undefined), undefined);
  assert.equal(normalizePortfolio(null), undefined);
});

test("normalizePortfolio rejects incomplete or invalid metadata", () => {
  assert.equal(
    normalizePortfolio({
      order: 0,
      label: "Invalid",
      outcome: "No positive order",
      capabilities: ["Skill"],
    }),
    undefined,
  );
  assert.equal(
    normalizePortfolio({
      order: 1,
      label: "",
      outcome: "Missing label",
      capabilities: ["Skill"],
    }),
    undefined,
  );
  assert.equal(
    normalizePortfolio({
      order: 1,
      label: "Invalid",
      outcome: "",
      capabilities: [],
    }),
    undefined,
  );
});

test("normalizeSeries returns normalized publishing metadata", () => {
  assert.deepEqual(
    normalizeSeries({
      id: "copilot-practice-2026",
      title: "AI 副驾实践手记",
      part: 3,
      week: "2026-W23",
      slot: "pillar",
    }),
    {
      id: "copilot-practice-2026",
      title: "AI 副驾实践手记",
      part: 3,
      week: "2026-W23",
      slot: "pillar",
    },
  );
});

test("normalizeSeries rejects invalid slot or part", () => {
  assert.equal(normalizeSeries(undefined), undefined);
  assert.equal(
    normalizeSeries({
      id: "copilot-practice-2026",
      title: "AI 副驾实践手记",
      part: 0,
      week: "2026-W23",
      slot: "pillar",
    }),
    undefined,
  );
  assert.equal(
    normalizeSeries({
      id: "copilot-practice-2026",
      title: "AI 副驾实践手记",
      part: 1,
      week: "2026-W23",
      slot: "unknown",
    }),
    undefined,
  );
});
