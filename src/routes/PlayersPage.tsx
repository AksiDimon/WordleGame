import { useEffect, useState } from 'react';
import { getUsersTop, PublicUser } from '../services/users';
import { Link } from 'react-router-dom';

export default function PlayersPage() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersTop(100)
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-6">Загрузка игроков…</div>;

  return (
    <div className="panel p-4 space-y-4">
      <h2 className="text-xl font-semibold">Игроки</h2>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {users.map((u) => (
          <li key={u.id} className="py-3 flex items-center gap-3">
            {u.photoURL ? (
              <img src={u.photoURL} alt="" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            )}
            <div className="flex-1">
              <div className="font-medium">{u.name}</div>
              <div className="text-sm opacity-70">
                Сыграно: {u.gamesPlayed ?? 0}
                {typeof (u as any).gamesWon === 'number' && (
                  <> • Побед: {(u as any).gamesWon}</>
                )}
                {typeof (u as any).gamesLost === 'number' && (
                  <> • Поражений: {(u as any).gamesLost}</>
                )}
              </div>
            </div>
            <Link to={`/players/${u.id}`} className="underline">
              Профиль
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
