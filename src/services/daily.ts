// Читает updatedAt из game/daily и возвращает момент следующего открытия (Date)
import { doc, getDoc, type Timestamp } from "firebase/firestore";

import { db } from "../firebase";

export async function getNextRevealAt(): Promise<Date> {
  const ref = doc(db, "game", "daily");
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as { updatedAt?: Timestamp };
    const base = data.updatedAt?.toDate() ?? new Date();
    return new Date(base.getTime() + 24 * 60 * 60 * 1000);
  }
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}
