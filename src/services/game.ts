import {
  doc,
  runTransaction,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import type { Timestamp, FieldValue } from 'firebase/firestore';

import type { GameStatus } from '../features/game/store';
import { db } from '../firebase';

export function formatDay(date = new Date(), tz = 'Europe/Amsterdam') {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(date); // YYYY-MM-DD
}

type SaveParams = {
  uid: string;
  day: string;
  status: GameStatus; // 'won' | 'lost'
  rows: string[];
};

export async function saveGameResultOncePerDay({
  uid,
  day,
  status,
  rows,
}: SaveParams) {
  const userRef = doc(db, 'users', uid);
  const resultRef = doc(db, 'users', uid, 'results', day);

  await runTransaction(db, async (tx) => {
    const resultSnap = await tx.get(resultRef);

    if (resultSnap.exists()) return;

    tx.set(resultRef, {
      day,
      status,
      rows,
      playedAt: serverTimestamp(),
    });

    const updates: Record<string, null | Timestamp | number | FieldValue> = {
      gamesPlayed: increment(1),
      lastPlayedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (status === 'won') {
      updates.gamesWon = increment(1);
    } else if (status === 'lost') {
      updates.gamesLost = increment(1);
    }

    const perDayCounts: Record<string, number> = {};
    for (const w of rows ?? []) {
      const up = (w || '').toUpperCase();
      if (!up) continue;
      perDayCounts[up] = (perDayCounts[up] ?? 0) + 1;
    }
    const wordsUpdate: Record<string, FieldValue> = {};
    // ограничим до 25 ключей за день (безопасно по размеру дока)
    for (const [word, cnt] of Object.entries(perDayCounts).slice(0, 25)) {
      wordsUpdate[`wordsTop.${word}`] = increment(cnt);
    }

    tx.update(userRef, { ...updates, ...wordsUpdate });
  });
}
