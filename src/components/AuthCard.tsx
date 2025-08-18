import { signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

import { useAuth } from '../features/auth/auth.store';
import { auth, googleProvider } from '../firebase';

export default function AuthCard() {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      } else {
        setError('Не удалось войти');
      }
    }
  };

  const signOutNow = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out failed:', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60dvh] grid place-items-center px-4">
        <div className="text-sm opacity-70" aria-busy="true">
          Загрузка…
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60dvh] grid place-items-center px-4">
        <div
          className="w-full max-w-sm text-center rounded-2xl border shadow-lg p-6
                        bg-[var(--color-panel)] border-[var(--color-border)] text-[var(--color-fg)]"
        >
          <h1 className="mb-2 text-lg font-bold">Firebase Google Auth</h1>
          <p className="mb-4 opacity-70">Войдите, чтобы продолжить</p>

          <button onClick={signIn} className="btn btn-primary w-full">
            Войти через Google
          </button>

          {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60dvh] grid place-items-center px-4">
      <div
        className="w-full max-w-sm text-center rounded-2xl border shadow-lg p-6
                      bg-[var(--color-panel)] border-[var(--color-border)] text-[var(--color-fg)]"
      >
        <h1 className="mb-2 text-lg font-bold">
          Привет, {user.displayName ?? 'безымянный'}!
        </h1>
        <p className="mb-4 opacity-70">{user.email}</p>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Аватар"
            className="w-24 h-24 rounded-xl mb-4 object-cover mx-auto"
            width={96}
            height={96}
            loading="lazy"
          />
        )}

        <button onClick={signOutNow} className="btn btn-ghost w-full">
          Выйти
        </button>
      </div>
    </div>
  );
}
