import AuthCard from "../components/AuthCard";
import SyncBadge from "../components/SyncBadge";
import { useAuth } from "../features/auth/auth.store";
export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="panel p-4 space-y-4">
      <h2 className="text-xl font-semibold">Профиль: {user && <SyncBadge uid={user.uid} />}</h2>
      
      <AuthCard />
      {user && (
        <div className="space-y-2">
          <div>UID: {user.uid}</div>
          <div>Email: {user.email}</div>

        </div>
      )}
    </div>
  );
}
