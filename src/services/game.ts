import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp, runTransaction } from "firebase/firestore";
import type { GameStatus } from "../features/game/store";
import { bumpGamesPlayed } from "./users"; // ← добавь

// ... getAnswerForDay как раньше

export async function saveGameResult( uid: string
) {
  // счётчик на публичной карточке игрока
  await bumpGamesPlayed(uid);
}

