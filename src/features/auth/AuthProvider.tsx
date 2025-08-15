import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthStore } from './auth.store';
import { ensureUserDocument } from '../../services/users';

/**
 * Нужен только чтобы один раз подписаться на Firebase.
 * НИЧЕГО не читает из стора → не триггерит собственные ререндеры.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  // Гард от повторной инициализации в StrictMode (двойной mount в dev)
  

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, async(u) => {
      setUser(u ?? null);
      setLoading(false);
          if (u) {
        try { await ensureUserDocument(u); } catch (e) { console.error(e); }
      }
    });

    return () => unsub();
  }, []);

  return <>{children}</>;
}

