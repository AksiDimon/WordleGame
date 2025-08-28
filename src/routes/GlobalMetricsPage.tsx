import { useEffect, useState } from 'react';

import HourBars from '../components/charts/HourBars';
import { Loader } from '../components/Loader';
import { getGlobalMetrics, type GlobalMetrics } from '../services/metrics/global';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}

export default function GlobalMetricsPage() {
  const [data, setData] = useState<GlobalMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getGlobalMetrics()
      .then((d) => { if (mounted) setData(d); })
      .catch((e) => { console.error(e); if (mounted) setErr('Не удалось загрузить глобальные метрики'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);


  if (loading) return <div className="py-8 flex justify-center"><Loader/></div>;
  if (err) return <div className="py-8 text-rose-600">{err}</div>;
  if (!data) return null;

  const wr = Math.round(data.winRate * 100);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl md:text-2xl font-semibold">Глобальные метрики</h2>
        <p className="text-sm opacity-70">По всем пользователям (на клиенте)</p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Игроков" value={data.players} />
        <Stat label="Игр всего" value={data.totalGames} />
        <Stat label="Побед" value={data.totalWins} />
        <Stat label="Поражений" value={data.totalLosses} />
        <Stat label="Win rate" value={`${wr}%`} />
        <Stat label="Игры/игрок" value={data.avgGamesPerPlayer} />
      </section>

      <section className="panel p-4 space-y-3">
        <h3 className="font-semibold">Когда чаще играют (по последней игре каждого)</h3>
        <HourBars buckets={data.hourBuckets} />
      </section>

      <section className="panel p-4 space-y-3">
        <h3 className="font-semibold">Топ-слова (вводимые игроками)</h3>
        {data.topWords.length === 0 ? (
          <div className="text-sm opacity-70">Пока нет данных</div>
        ) : (
          <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-4 list-decimal list-inside">
            {data.topWords.map(({ word, count }) => (
              <li key={word} className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 py-1">
                <span className="font-medium tracking-widest">{word}</span>
                <span className="tabular-nums text-sm opacity-70">{count}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
