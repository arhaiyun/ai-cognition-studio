export function selectPortfolioContents(contents) {
  return contents
    .filter((item) => item.portfolio)
    .slice()
    .sort((a, b) => a.portfolio.order - b.portfolio.order);
}
