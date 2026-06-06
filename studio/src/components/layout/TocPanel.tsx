import { useLayout } from "./LayoutContext";

export function TocPanel() {
  const { toc } = useLayout();

  if (toc.length === 0) {
    return (
      <aside className="toc toc--empty" aria-label="文内目录">
        <p className="toc__placeholder">打开文章后显示目录</p>
      </aside>
    );
  }

  return (
    <aside className="toc" aria-label="文内目录">
      <h2 className="toc__title">目录</h2>
      <ul className="toc__list">
        {toc.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "toc__item toc__item--h3" : "toc__item"}
          >
            <a href={`#${item.id}`} className="toc__link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
