#!/usr/bin/env node
/**
 * Offline verifier for arch-diagram-builder HTML output.
 * Usage: node scripts/verify-diagram.mjs path/to/diagram.html
 * Exit 0 if all checks pass; prints JSON summary.
 */
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("用法: node verify-diagram.mjs <diagram.html>");
  process.exit(2);
}

const html = fs.readFileSync(path.resolve(file), "utf8");
const checks = [];

function check(name, passed, evidence) {
  checks.push({ text: name, passed, evidence });
}

check(
  "single-file-no-external-scripts",
  !/<script[^>]+src=["']https?:/i.test(html) && !/<link[^>]+href=["']https?:/i.test(html),
  "无 http(s) 外链 script/link",
);

const tokens = ["--blu:", "--pur:", "--grn:", "--org:", "--cya:", "--bd:"];
for (const t of tokens) {
  check(`css-token-${t.replace(":", "")}`, html.includes(t), `包含 ${t}`);
}

check("svg-viewbox", /viewBox=["']0 0 \d{3,4} \d{3,4}["']/.test(html), "SVG viewBox 存在");
check("steps-array", /const\s+STEPS\s*=\s*\[/.test(html), "STEPS 数组定义");
check(
  "step-count-6-9",
  (() => {
    const m = html.match(/const\s+STEPS\s*=\s*\[([\s\S]*?)\n\];/);
    if (!m) return false;
    const blocks = m[1].split(/\n\s*\{/).length;
    return blocks >= 6 && blocks <= 12;
  })(),
  "步骤数约 6–9（启发式）",
);

const connPaths = (html.match(/id=["']conn-[^"']+["'][\s\S]*?<path/g) || []).length;
const pathConns = (html.match(/<path[^>]*id=["']conn-/g) || []).length;
check("connections-use-path", pathConns >= 3, `至少 3 条 conn path（实际 ${pathConns}）`);
check(
  "no-conn-line-elements",
  !/<line[^>]*id=["']conn-/i.test(html),
  "连线未使用 <line id=conn-*>",
);

check(
  "particle-motion",
  html.includes("animateMotion") && html.includes("mpath"),
  "含 animateMotion + mpath",
);

check(
  "keyboard-nav",
  html.includes("ArrowRight") && html.includes("btn-next"),
  "键盘与下一步按钮",
);

check(
  "bidirectional-lanes-hint",
  pathConns < 8 || html.includes("path-routing") || html.match(/<path[^>]*id=["']conn-[^"']+["'][\s\S]*?d=["'][^"']*C /g)?.length >= 2,
  "多条连线含曲线或文档提及分车道（双向不易堆叠）",
);

check(
  "reset-control",
  /btn-reset|key.*===.*["']R["']/i.test(html),
  "重置控制",
);

const failed = checks.filter((c) => !c.passed);
const summary = {
  file: path.resolve(file),
  passed: failed.length === 0,
  pass_rate: `${checks.length - failed.length}/${checks.length}`,
  checks,
};

console.log(JSON.stringify(summary, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
