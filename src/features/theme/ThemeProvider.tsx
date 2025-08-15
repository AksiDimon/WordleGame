import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void };
const ThemeCtx = createContext<Ctx>({ theme: "dark", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? (saved as Theme) : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")),
  }), [theme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

