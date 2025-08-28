import { collection, getDocs, type Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

export type GlobalMetrics = {
  players: number;
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  avgGamesPerPlayer: number;
  hourBuckets: Record<string, number>; // "00".."23" по lastPlayedAt
  topWords: Array<{ word: string; count: number }>; // топ-50 слов игры
};

function hourOf(ts?: Timestamp, tz = 'Europe/Amsterdam'): string | null {
  if (!ts) return null;
  const d = ts.toDate();
  const h = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(d);
  return h; // "00".."23"
}

export async function getGlobalMetrics(): Promise<GlobalMetrics> {
  // ⚠️ для большого числа пользователей это может быть тяжело по чтениям.
  // Для учебного/малого проекта ок.
  const snap = await getDocs(collection(db, 'users'));

  let players = 0;
  let totalGames = 0;
  let totalWins = 0;
  let totalLosses = 0;

  const hourBins: Record<string, number> = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [String(i).padStart(2, '0'), 0])
  ) as Record<string, number>;

  const globalWordCounts = new Map<string, number>();

  snap.forEach((doc) => {
    const d = doc.data();
    players += 1;

    const gp = Number(d?.gamesPlayed ?? 0);
    const gw = Number(d?.gamesWon ?? 0);
    const gl = Number(d?.gamesLost ?? 0);

    totalGames += gp;
    totalWins += gw;
    totalLosses += gl;

    const hh = hourOf(d?.lastPlayedAt);
    if (hh) hourBins[hh] = (hourBins[hh] ?? 0) + 1;

    // агрегат топ-слов пользователя (если уже есть)
    const wt = d?.wordsTop as Record<string, number> | undefined;
    if (wt) {
      for (const [w, c] of Object.entries(wt)) {
        const up = (w || '').toUpperCase();
        if (!up) continue;
        globalWordCounts.set(up, (globalWordCounts.get(up) ?? 0) + Number(c ?? 0));
      }
    }
  });

  const winRate = totalGames ? totalWins / totalGames : 0;
  const avgGamesPerPlayer = players ? totalGames / players : 0;
console.log(totalWins, totalGames,winRate, '😀')
  const topWords = Array.from(globalWordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([word, count]) => ({ word, count }));

  return {
    players,
    totalGames,
    totalWins,
    totalLosses,
    winRate,
    avgGamesPerPlayer: +avgGamesPerPlayer.toFixed(2),
    hourBuckets: hourBins,
    topWords,
  };
}
