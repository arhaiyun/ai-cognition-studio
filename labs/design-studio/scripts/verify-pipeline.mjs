#!/usr/bin/env node
/**
 * 检查系列自媒体资产是否齐全（manifest、diagram、script）
 * 用法: node verify-pipeline.mjs <series-slug>
 * 例: node verify-pipeline.mjs ai-investment
 */
import { readdir, readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../../..');

const SERIES = process.argv[2];
if (!SERIES) {
  console.error('用法: node verify-pipeline.mjs <series-slug>');
  process.exit(1);
}

const checks = [];
let failed = 0;

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function ok(msg) {
  checks.push(`✓ ${msg}`);
}

function fail(msg) {
  checks.push(`✗ ${msg}`);
  failed++;
}

// 系列预设（可扩展）
const SERIES_MAP = {
  'ai-investment': {
    diagrams: [
      'ai-investment-thesis.html',
      'ai-investment-index.html',
      'ai-industry-chain-global.html',
      'ai-industry-chain-players.html',
      'ai-revolution-stage-comparison.html',
    ],
    cognition: ['04', '05', '06', '07'],
    script: 'ai-investment-presentation-script.md',
  },
  'ai-agent-dev': {
    diagrams: ['ai-agent-dev-system.html'],
    cognition: ['03'],
    script: 'ai-agent-dev-system-architecture-script.md',
  },
  'ai-product-six-layers': {
    diagrams: ['ai-product-six-layers.html'],
    cognition: ['02'],
    script: 'ai-product-six-layers-presentation-script.md',
  },
};

const spec = SERIES_MAP[SERIES];
if (!spec) {
  console.error(`未知系列: ${SERIES}。可选: ${Object.keys(SERIES_MAP).join(', ')}`);
  process.exit(1);
}

for (const d of spec.diagrams) {
  const p = join(ROOT, 'docs/diagrams', d);
  if (await exists(p)) ok(`diagram: ${d}`);
  else fail(`diagram 缺失: docs/diagrams/${d}`);
}

for (const part of spec.cognition) {
  const dir = join(ROOT, 'cognition');
  const files = await readdir(dir);
  const match = files.find((f) => f.startsWith(part));
  if (match) ok(`cognition: ${match}`);
  else fail(`cognition 缺失: part ${part}`);
}

const scriptPath = join(ROOT, 'docs/presentation', spec.script);
if (await exists(scriptPath)) ok(`script: ${spec.script}`);
else fail(`口播稿缺失（可选）: docs/presentation/${spec.script}`);

// 检查 diagram HTML 基本结构
for (const d of spec.diagrams) {
  const p = join(ROOT, 'docs/diagrams', d);
  if (!(await exists(p))) continue;
  const html = await readFile(p, 'utf8');
  if (html.includes('<!DOCTYPE') || html.includes('<html')) ok(`HTML 有效: ${d}`);
  else fail(`非 HTML: ${d}`);
  if (d.includes('index')) continue;
  if (html.includes('STEPS') || html.includes('step')) ok(`步进结构: ${d}`);
}

console.log(`\n系列检查: ${SERIES}\n`);
checks.forEach((c) => console.log(c));
console.log(failed ? `\n${failed} 项待补全` : '\n全部通过');
process.exit(failed > 0 ? 1 : 0);
