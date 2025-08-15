import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../features/theme/ThemeToggle";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../features/auth/auth.store";
import { auth, googleProvider } from "../firebase";
import { useEffect, useState, useCallback } from "react";

export function Header() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  // закрывать при смене маршрута
  useEffect(() => setOpen(false), [loc]);

  // Esc закрывает
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onKey]);

  return (
    <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
      <Link to="/" className="font-bold">
        Wordle Clone
      </Link>

      {/* Desktop nav */}
      <nav className="ml-auto hidden md:flex items-center gap-3">
        <Link to="/game">Играть</Link>
        <Link to="/players">Игроки</Link>
        <Link to="/profile">Профиль</Link>
        <ThemeToggle />
        {!loading &&
          (user ? (
            <button onClick={() => signOut(auth)} className="underline">Выйти</button>
          ) : (
            <button onClick={() => signInWithPopup(auth, googleProvider)} className="underline">
              Войти
            </button>
          ))}
      </nav>

      {/* Mobile burger */}
      <button
        type="button"
        aria-label="Открыть меню"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="ml-auto md:hidden inline-flex flex-col items-center justify-center rounded-lg p-2 border border-zinc-300 dark:border-zinc-700"
      >
        <span className="block w-4 h-0.5 bg-current mb-1" />
        <span className="block w-4 h-0.5 bg-current mb-1" />
        <span className="block w-4 h-[2.5px] bg-current" />
      </button>

      {/* Overlay + Drawer */}
      <div
        className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* затемнение фона */}
        <div
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        {/* выезжающая панель */}
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
            <div className="font-bold">Меню</div>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700"
            >
              ✕
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-3">
            <Link to="/game" onClick={() => setOpen(false)} className="py-2">
              Играть
            </Link>
            <Link to="/players" onClick={() => setOpen(false)} className="py-2">
              Игроки
            </Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="py-2">
              Профиль
            </Link>

            <div className="py-2">
              <ThemeToggle />
            </div>

            {!loading &&
              (user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut(auth);
                  }}
                  className="text-left underline py-2"
                >
                  Выйти
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    signInWithPopup(auth, googleProvider);
                  }}
                  className="text-left underline py-2"
                >
                  Войти
                </button>
              ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}

export default Header;

