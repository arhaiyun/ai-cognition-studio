import type { ContentMeta } from "../types";

export interface SearchResult {
  item: ContentMeta;
  score: number;
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

export function searchContents(
  contents: ContentMeta[],
  query: string,
  limit = 20,
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored: SearchResult[] = [];

  for (const item of contents) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const summaryLower = item.summary.toLowerCase();
    const tagLower = item.tags.join(" ").toLowerCase();

    for (const token of tokens) {
      if (titleLower.includes(token)) score += 10;
      if (summaryLower.includes(token)) score += 4;
      if (tagLower.includes(token)) score += 6;
      if (item.searchText.includes(token)) score += 1;
    }

    if (score > 0) scored.push({ item, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
