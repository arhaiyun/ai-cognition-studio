function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
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
