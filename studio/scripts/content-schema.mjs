function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

const SERIES_SLOTS = new Set(["pillar", "practice", "handbook", "input", "recap"]);

export function normalizeSeries(value) {
  if (!value || typeof value !== "object") return undefined;

  const id = typeof value.id === "string" ? value.id.trim() : "";
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const part = Number(value.part);
  const week = typeof value.week === "string" ? value.week.trim() : "";
  const slot = typeof value.slot === "string" ? value.slot.trim() : "";

  if (!id || !title || !Number.isInteger(part) || part < 1 || !week || !SERIES_SLOTS.has(slot)) {
    return undefined;
  }

  return { id, title, part, week, slot };
}

export function normalizePortfolio(value) {
  if (!value || typeof value !== "object") return undefined;

  const order = Number(value.order);
  const label = typeof value.label === "string" ? value.label.trim() : "";
  const outcome = typeof value.outcome === "string" ? value.outcome.trim() : "";
  const capabilities = normalizeStringArray(value.capabilities);

  if (!Number.isInteger(order) || order < 1 || !label || !outcome || capabilities.length === 0) {
    return undefined;
  }

  return { order, label, outcome, capabilities };
}

export function normalizeDiagram(value) {
  if (typeof value === "string") {
    const src = value.trim();
    return src ? { src, title: "架构图", height: 960 } : undefined;
  }

  if (!value || typeof value !== "object") return undefined;

  const src = typeof value.src === "string" ? value.src.trim() : "";
  const title = typeof value.title === "string" ? value.title.trim() : "架构图";
  const height = Number(value.height);

  if (!src) return undefined;

  return {
    src,
    title: title || "架构图",
    height: Number.isInteger(height) && height >= 320 ? height : 960,
  };
}
