import { Route, Routes } from "react-router-dom";
import { LayoutProvider } from "./components/layout/LayoutContext";
import { StudioLayout } from "./components/layout/StudioLayout";
import { ContentPage } from "./pages/ContentPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route element={<StudioLayout />}>
          <Route index element={<HomePage />} />
          <Route path="c/:slug" element={<ContentPage />} />
        </Route>
      </Routes>
    </LayoutProvider>
  );
}
