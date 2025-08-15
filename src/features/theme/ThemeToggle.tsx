import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm"
      title="Переключить тему"
    >
      {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}

