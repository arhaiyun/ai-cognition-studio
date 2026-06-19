import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TocPanel } from "./TocPanel";
import { TopBar } from "./TopBar";

export function StudioLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`studio${isHome ? " studio--home" : ""}`}>
      <TopBar />
      <div className="studio__body">
        {!isHome && <Sidebar />}
        <main className="studio__main">
          <Outlet />
        </main>
        {!isHome && <TocPanel />}
      </div>
    </div>
  );
}
