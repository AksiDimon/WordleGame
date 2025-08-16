import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="cursor-pointer px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm inline-flex items-center gap-2"
      title="Переключить тему"
    >
      <span className="text-lg" aria-hidden>{theme === "dark" ? "🌞" : "🌙"}</span>
      {theme === "dark" ? "Светлая" : "Тёмная"}
    </button>
  );
}


