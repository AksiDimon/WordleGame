import { useAuth } from "../features/auth/auth.store";
import AuthCard from "../components/AuthCard";
import SyncBadge from "../components/SyncBadge";
export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Профиль: {user && <SyncBadge uid={user.uid} />}</h2>
      
      {/* Покажем ту же карточку (в залогиненом состоянии это приветствие и кнопка выхода) */}
      <AuthCard />
      {user && (
        <div className="space-y-2">
          <div>UID: {user.uid}</div>
          <div>Email: {user.email}</div>
          {/* TODO: подтянуть users/{uid}/stats/main и вывести статистику */}
        </div>
      )}
    </div>
  );
}
