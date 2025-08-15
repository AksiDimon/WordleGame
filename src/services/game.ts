import { db } from "../firebase";
import {
  doc, runTransaction, serverTimestamp, increment,
} from "firebase/firestore";
import type { GameStatus } from "../features/game/store";

export function formatDay(date = new Date(), tz = "Europe/Amsterdam") {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(date); // YYYY-MM-DD
}

type SaveParams = {
  uid: string;
  day: string;            // YYYY-MM-DD (та же TZ, что и логика «дня» в игре)
  status: GameStatus;     // 'won' | 'lost'
  rows: string[];
};

export async function saveGameResultOncePerDay({ uid, day, status, rows }: SaveParams) {
  const userRef   = doc(db, "users", uid);
  const resultRef = doc(db, "users", uid, "results", day);

  await runTransaction(db, async (tx) => {
    const resultSnap = await tx.get(resultRef);

    // если уже есть запись за этот день — НИЧЕГО не меняем (идемпотентность)
    if (resultSnap.exists()) return;

    // фиксируем сам результат дня (для истории/деталей)
    tx.set(resultRef, {
      day,
      status,
      rows,
      playedAt: serverTimestamp(),
    });

    // инкременты на общей карточке пользователя
    const updates: Record<string, any> = {
      gamesPlayed: increment(1),       // 1) все игры
      lastPlayedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (status === "won") {
      updates.gamesWon = increment(1); // 2) выигранные игры
    } else if (status === "lost") {
      updates.gamesLost = increment(1);  // ← поражение
    }

    tx.update(userRef, updates);
  });
}


