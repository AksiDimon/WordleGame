import { create } from 'zustand';
import type { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

/** Удобный хук для компонентов — возвращает кортеж (меньше шанс лишних ререндеров) */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  return { user, loading };
}
