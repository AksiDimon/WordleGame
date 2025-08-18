import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { useAuthStore } from './auth.store';
import { auth } from '../../firebase';
import { ensureUserDocument } from '../../services/users';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (u) => {
       setUser(u ?? null);
      setLoading(false);
          if (u) {
            void ensureUserDocument(u).catch((e) => {
              console.error(e)
            })

      }
    });

    return () => unsub();
  }, [setLoading, setUser]);

  return <>{children}</>;
}

