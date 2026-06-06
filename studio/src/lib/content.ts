import type { ContentIndex, ContentMeta, TocItem } from "../types";
import contentIndex from "../generated/content.json";

export const content = contentIndex as ContentIndex;

export function getContent(slug: string): ContentMeta | undefined {
  return content.contents.find((item) => item.slug === slug);
}

/** @deprecated 使用 getContent */
export const getArticle = getContent;

export function getContentsBySection(sectionId: string): ContentMeta[] {
  return content.contents.filter((item) => item.section === sectionId);
}

/** @deprecated 使用 getContentsBySection */
export const getArticlesBySection = getContentsBySection;

export function groupContentsBySection(): Map<string, ContentMeta[]> {
  const map = new Map<string, ContentMeta[]>();
  for (const section of content.sections) {
    map.set(section.id, getContentsBySection(section.id));
  }
  return map;
}

/** @deprecated 使用 groupContentsBySection */
export const groupArticlesBySection = groupContentsBySection;

const bodyModules = import.meta.glob("../generated/articles/*.md", {
  query: "?raw",
  import: "default",
});

export async function loadContentBody(slug: string): Promise<string | null> {
  const key = `../generated/articles/${slug}.md`;
  const loader = bodyModules[key];
  if (!loader) return null;
  return (await loader()) as string;
}

/** @deprecated 使用 loadContentBody */
export const loadArticleBody = loadContentBody;

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, "").trim();
    const base = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;

    items.push({ id, text, level });
  }

  return items;
}
