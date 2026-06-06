import { NavLink } from "react-router-dom";
import { groupContentsBySection } from "../../lib/content";

export function Sidebar() {
  const grouped = groupContentsBySection();

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
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
