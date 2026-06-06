export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function makeHeadingId(text: string, counts: Map<string, number>): string {
  const base = slugifyHeading(text);
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count > 0 ? `${base}-${count}` : base;
}

export function createHeadingIdFactory() {
  const counts = new Map<string, number>();
  return (text: string) => makeHeadingId(text, counts);
}
