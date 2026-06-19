import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { normalizePortfolio, normalizeSeries } from "./content-schema.mjs";

const SCHEMA_VERSION = 1;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.resolve(__dirname, "../src/generated");
const ARTICLES_DIR = path.join(OUT_DIR, "articles");
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const STATIC_ASSETS = [
  {
    source: path.join(ROOT, "labs/project-incubator/assets/project-incubator-flow.png"),
    target: path.join(PUBLIC_DIR, "project-incubator-flow.png"),
  },
];

const SECTIONS = [
  { id: "cognition", label: "认知框架", dir: "cognition", icon: "◈", type: "article" },
  { id: "essays", label: "深度思考", dir: "essays", icon: "✦", type: "article" },
  { id: "podcast", label: "播客笔记", dir: "podcast", icon: "◎", type: "podcast-card" },
  { id: "playbooks", label: "实践手册", dir: "playbooks", icon: "▣", type: "playbook" },
  { id: "meta", label: "元信息", dir: "meta", icon: "◇", type: "meta" },
  { id: "labs", label: "Labs", dir: "labs", icon: "⚙", type: "lab", subReadmes: true },
  { id: "agents", label: "Agents", dir: "agents", icon: "⬡", type: "agent", subReadmes: true, includeRootReadme: true },
];

const CONTENT_TYPES = new Set([
  "article",
  "playbook",
  "lab",
  "agent",
  "podcast-card",
  "meta",
]);

const SKIP_FILES = new Set(["README.md", "_template.md", "_template-series.md"]);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function makeSlug(sectionId, relativePath) {
  const base = relativePath.replace(/\.md$/, "").replace(/\//g, "-");
  return `${sectionId}--${slugify(base) || "untitled"}`;
}

function normalizeDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function normalizeStatus(value) {
  const map = { published: "stable", draft: "draft" };
  const normalized = map[value] ?? value;
  const allowed = new Set(["draft", "exploring", "stable", "archived"]);
  return allowed.has(normalized) ? normalized : "stable";
}

function normalizeType(value, sectionType) {
  return CONTENT_TYPES.has(value) ? value : sectionType;
}

function normalizeStringArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function normalizePodcastLinks(links) {
  if (!links || typeof links !== "object") return undefined;
  const out = {};
  for (const key of ["xiaoyuzhou", "apple", "spotify", "youtube"]) {
    if (links[key]) out[key] = String(links[key]);
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function normalizeRelated(related) {
  if (!related || typeof related !== "object") return undefined;
  const essays = normalizeStringArray(related.essays);
  const labs = normalizeStringArray(related.labs);
  if (essays.length === 0 && labs.length === 0) return undefined;
  return { essays, labs };
}

function collectMarkdownFiles(section) {
  const baseDir = path.join(ROOT, section.dir);
  if (!fs.existsSync(baseDir)) return [];

  const files = [];

  if (section.subReadmes) {
    for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
      const readme = path.join(baseDir, entry.name, "README.md");
      if (fs.existsSync(readme)) {
        files.push({
          absPath: readme,
          relativePath: `${entry.name}/README.md`,
        });
      }
    }
    if (section.includeRootReadme) {
      const rootReadme = path.join(baseDir, "README.md");
      if (fs.existsSync(rootReadme)) {
        files.unshift({ absPath: rootReadme, relativePath: "README.md" });
      }
    }
    return files;
  }

  function walk(dir, prefix = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs, rel);
      } else if (entry.name.endsWith(".md") && !SKIP_FILES.has(entry.name)) {
        files.push({ absPath: abs, relativePath: rel });
      }
    }
  }

  walk(baseDir);
  return files;
}

function extractTitle(fm, body, fallback) {
  if (fm.title) return fm.title;
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSearchText(meta, body) {
  const parts = [
    meta.title,
    meta.summary,
    meta.sectionLabel,
    ...meta.tags,
    ...meta.audience,
    ...(meta.takeaways ?? []),
    stripMarkdown(body),
  ];
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function buildContentMeta(section, absPath, relativePath) {
  const raw = fs.readFileSync(absPath, "utf8");
  const { data: fm, content: body } = matter(raw);
  const slug = makeSlug(section.id, relativePath);
  const title = extractTitle(fm, body, path.basename(relativePath, ".md"));
  const type = normalizeType(fm.type, section.type);

  const meta = {
    slug,
    type,
    section: section.id,
    sectionLabel: section.label,
    sectionIcon: section.icon,
    title,
    date: normalizeDate(fm.date),
    status: normalizeStatus(fm.status),
    audience: normalizeStringArray(fm.audience),
    tags: normalizeStringArray(fm.tags),
    summary: fm.summary ?? "",
    sourcePath: `${section.dir}/${relativePath}`,
  };

  const portfolio = normalizePortfolio(fm.portfolio);
  if (portfolio) meta.portfolio = portfolio;

  const series = normalizeSeries(fm.series);
  if (series) meta.series = series;

  if (type === "podcast-card") {
    const takeaways = normalizeStringArray(fm.takeaways);
    if (takeaways.length > 0) meta.takeaways = takeaways;

    const links = normalizePodcastLinks(fm.links);
    if (links) meta.links = links;

    const hosts = normalizeStringArray(fm.hosts);
    if (hosts.length > 0) meta.hosts = hosts;

    const guests = normalizeStringArray(fm.guests);
    if (guests.length > 0) meta.guests = guests;

    if (fm.duration_min != null) meta.durationMin = fm.duration_min;

    const related = normalizeRelated(fm.related);
    if (related) meta.related = related;
  }

  meta.searchText = buildSearchText(meta, body);

  return { meta, body, slug };
}

function loadPublishingSchedule() {
  const schedulePath = path.join(ROOT, "meta/publishing-schedule.json");
  if (!fs.existsSync(schedulePath)) return undefined;

  try {
    return JSON.parse(fs.readFileSync(schedulePath, "utf8"));
  } catch (error) {
    console.warn("⚠ 无法解析 meta/publishing-schedule.json:", error.message);
    return undefined;
  }
}

function buildPublishingLine(schedule, contents) {
  if (!schedule?.activeSeries) return undefined;

  const bySource = new Map(contents.map((item) => [item.sourcePath, item]));
  const currentWeek = schedule.activeSeries.currentWeek;
  const weekPlan = schedule.weeks?.find((week) => week.week === currentWeek);

  const currentWeekArticles = (weekPlan?.articles ?? []).map((planned) => {
    const published = bySource.get(planned.sourcePath);
    return {
      ...planned,
      status: published ? "published" : planned.status ?? "planned",
      slug: published?.slug,
      sectionLabel: published?.sectionLabel,
    };
  });

  const seriesContents = contents
    .filter((item) => item.series?.id === schedule.activeSeries.id)
    .slice()
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

  return {
    activeSeries: schedule.activeSeries,
    cadence: schedule.cadence,
    phases: schedule.phases ?? [],
    currentWeek: weekPlan
      ? {
          week: weekPlan.week,
          theme: weekPlan.theme,
          status: weekPlan.status,
          phase: weekPlan.phase,
          articles: currentWeekArticles,
        }
      : undefined,
    seriesContents,
  };
}

function build() {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  for (const file of fs.readdirSync(ARTICLES_DIR)) {
    if (file.endsWith(".md")) fs.unlinkSync(path.join(ARTICLES_DIR, file));
  }

  for (const asset of STATIC_ASSETS) {
    if (fs.existsSync(asset.source)) {
      fs.copyFileSync(asset.source, asset.target);
    }
  }

  const contents = [];

  for (const section of SECTIONS) {
    const files = collectMarkdownFiles(section);

    for (const { absPath, relativePath } of files) {
      const { meta, body, slug } = buildContentMeta(section, absPath, relativePath);
      fs.writeFileSync(path.join(ARTICLES_DIR, `${slug}.md`), body.trimStart(), "utf8");
      contents.push(meta);
    }
  }

  contents.sort((a, b) => {
    const sectionOrder = SECTIONS.map((s) => s.id);
    const sa = sectionOrder.indexOf(a.section);
    const sb = sectionOrder.indexOf(b.section);
    if (sa !== sb) return sa - sb;
    if (a.date && b.date) return String(b.date).localeCompare(String(a.date));
    return a.title.localeCompare(b.title, "zh-CN");
  });

  const schedule = loadPublishingSchedule();
  const publishingLine = buildPublishingLine(schedule, contents);

  const index = {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    sections: SECTIONS.map(({ id, label, icon, type }) => ({
      id,
      label,
      icon,
      defaultType: type,
    })),
    contents,
    publishingLine,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "content.json"),
    JSON.stringify(index, null, 2),
    "utf8",
  );

  console.log(`✓ schema v${SCHEMA_VERSION} · 已索引 ${contents.length} 篇 → src/generated/`);
}

build();
