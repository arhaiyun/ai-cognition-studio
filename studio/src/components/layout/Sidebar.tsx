import { NavLink } from "react-router-dom";
import { getSeriesContents, getSeriesSlotLabel, groupContentsBySection } from "../../lib/content";

export function Sidebar() {
  const grouped = groupContentsBySection();
  const seriesContents = getSeriesContents();

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {seriesContents.length > 0 && (
          <section className="sidebar__section sidebar__section--series">
            <h2 className="sidebar__section-title">
              <span aria-hidden>▸</span>
              更新主线
            </h2>
            <ul className="sidebar__list">
              {seriesContents.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/c/${item.slug}`}
                    className={({ isActive }) =>
                      isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
                    }
                  >
                    <span className="sidebar__part">#{item.series?.part}</span>
                    <span className="sidebar__link-text">{item.title}</span>
                    {item.series?.slot && (
                      <span className="sidebar__slot">{getSeriesSlotLabel(item.series.slot)}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {Array.from(grouped.entries()).map(([sectionId, items]) => {
          if (items.length === 0) return null;
          const section = items[0];
          return (
            <section key={sectionId} className="sidebar__section">
              <h2 className="sidebar__section-title">
                <span aria-hidden>{section.sectionIcon}</span>
                {section.sectionLabel}
              </h2>
              <ul className="sidebar__list">
                {items.map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={`/c/${item.slug}`}
                      className={({ isActive }) =>
                        isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
