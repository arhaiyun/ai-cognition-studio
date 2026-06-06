import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { content } from "../../lib/content";
import { searchContents } from "../../lib/search";
import { useLayout } from "./LayoutContext";

export function TopBar() {
  const { searchQuery, setSearchQuery } = useLayout();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = searchQuery.trim()
    ? searchContents(content.contents, searchQuery)
    : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goTo(slug: string) {
    setOpen(false);
    setSearchQuery("");
    navigate(`/c/${slug}`);
  }

  return (
    <header className="topbar">
      <Link to="/" className="topbar__brand">
        <span className="topbar__brand-icon">◈</span>
        AI Cognition Studio
      </Link>

      <div className="topbar__search" ref={wrapperRef}>
        <input
          type="search"
          className="topbar__search-input"
          placeholder="搜索标题、标签、正文…"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {open && searchQuery.trim() && (
          <div className="topbar__search-dropdown">
            {results.length === 0 ? (
              <p className="topbar__search-empty">无匹配结果</p>
            ) : (
              <ul className="topbar__search-list">
                {results.map(({ item }) => (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className="topbar__search-item"
                      onClick={() => goTo(item.slug)}
                    >
                      <span className="topbar__search-item-icon">{item.sectionIcon}</span>
                      <span className="topbar__search-item-text">
                        <strong>{item.title}</strong>
                        <small>{item.sectionLabel}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
