import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { TocItem } from "../../types";

interface LayoutContextValue {
  toc: TocItem[];
  setToc: (items: TocItem[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(
    () => ({ toc, setToc, searchQuery, setSearchQuery }),
    [toc, searchQuery],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}
