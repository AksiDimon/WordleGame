import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './auth.store';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return null; 
  return user ? children : <Navigate to="/" replace state={{ from: loc }} />;
}
