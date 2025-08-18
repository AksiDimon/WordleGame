import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { getUser, type PublicUser } from '../services/users';

export default function PlayerStatsPage() {
  const { uid } = useParams<{ uid: string }>();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(true);
    getUser(uid!)
      .then(setUser, (e) => console.error('getUser failed:',e))
      .finally(() => setLoading(false));
  }, [uid]);
  if (!uid) return <Navigate to="/players" replace />;
  if (loading) return <div className="py-6 flex justify-center "><Loader/></div>;
  if (!user) return <div className="py-6 text-red-500">Игрок не найден</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {user.photoURL ? (
          <img src={user.photoURL} className="w-14 h-14 rounded-full" alt='UserPhoto' />
        ) : (
          <div className="w-14 h-14 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <div className="opacity-70 text-sm">UID: {user.id}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Сыграно" value={user.gamesPlayed ?? 0} />
        <Stat label="Побед" value={(user).gamesWon ?? 0} />
        <Stat label="Поражений" value={(user).gamesLost ?? 0} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}
