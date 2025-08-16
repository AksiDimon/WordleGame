import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../features/theme/ThemeToggle';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from '../features/auth/auth.store';
import { auth, googleProvider } from '../firebase';
import { useEffect, useState, useCallback } from 'react';
import LogoTileW from './icons/LogoTileW';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

export function Header() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  // закрывать при смене маршрута
  useEffect(() => setOpen(false), [loc]);

  // Esc закрывает
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onKey]);

  return (
    <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
      <Link
        to="/"
        //   className="font-bold"
        className="font-black tracking-tight text-lg relative"
      >
        {/* <span className="bg-gradient-to-r from-[var(--color-accent)] via-yellow-500 to-[var(--color-attn)] bg-clip-text text-transparent"> */}
        <LogoTileW className="h-7 w-auto text-fg" />
        {/* </span> */}
        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-attn)] opacity-60" />
        {/* Wordle Clone */}
      </Link>

      {/* Desktop nav */}
      <nav className="ml-auto hidden md:flex items-center gap-3">
        <NavLink
          to="/game"
          className={({ isActive }) =>
            `btn btn-ghost ${
              isActive ? 'ring-2 ring-[var(--color-accent)] ring-offset-0' : ''
            }`
          }
        >
          Играть
        </NavLink>
        <NavLink
          to="/players"
          className={({ isActive }) =>
            `btn btn-ghost ${
              isActive ? 'ring-2 ring-[var(--color-accent)] ring-offset-0' : ''
            }`
          }
        >
          Игроки
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `btn btn-ghost ${
              isActive ? 'ring-2 ring-[var(--color-accent)] ring-offset-0' : ''
            }`
          }
        >
          Профиль
        </NavLink>

        <ThemeToggle />
        {!loading &&
          (user ? (
            <LogoutButton onClick={() => signOut(auth)} />
          ) : (
            <LoginButton
              onClick={() => signInWithPopup(auth, googleProvider)}
            />
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
        className={`fixed inset-0 z-50 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* затемнение фона */}
        <div
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        {/* выезжающая панель */}
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-xl transition-transform duration-200 ${
            open ? 'translate-x-0' : 'translate-x-full'
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
            <NavLink
              to="/game"
              onClick={() => setOpen(false)}
              //  className="py-2"
              className={({ isActive }) =>
                `btn btn-ghost ${
                  isActive
                    ? 'ring-2 ring-[var(--color-accent)] ring-offset-0'
                    : ''
                }`
              }
            >
              Играть
            </NavLink>
            <NavLink
              to="/players"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `btn btn-ghost ${
                  isActive
                    ? 'ring-2 ring-[var(--color-accent)] ring-offset-0'
                    : ''
                }`
              }
            >
              Игроки
            </NavLink>
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `btn btn-ghost ${
                  isActive
                    ? 'ring-2 ring-[var(--color-accent)] ring-offset-0'
                    : ''
                }`
              }
            >
              Профиль
            </NavLink>

            <div className="py-2">
              <ThemeToggle />
            </div>

            {!loading &&
              (user ? (
                <LogoutButton
                  onClick={() => {
                    setOpen(false);
                    signOut(auth);
                  }}
                />
              ) : (
                <LoginButton
                  onClick={() => {
                    setOpen(false);
                    signInWithPopup(auth, googleProvider);
                  }}
                />
              ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}

