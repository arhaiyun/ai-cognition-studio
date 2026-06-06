import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TocPanel } from "./TocPanel";
import { TopBar } from "./TopBar";

export function StudioLayout() {
  return (
    <div className="studio">
      <TopBar />
      <div className="studio__body">
        <Sidebar />
        <main className="studio__main">
          <Outlet />
        </main>
        <TocPanel />
      </div>
    </div>
  );
}
