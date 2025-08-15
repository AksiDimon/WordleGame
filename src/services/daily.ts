// Читает updatedAt из game/daily и возвращает момент следующего открытия (Date)
import { db } from "../firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export async function getNextRevealAt(): Promise<Date> {
  const ref = doc(db, "game", "daily");
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as { updatedAt?: Timestamp };
    const base = data.updatedAt?.toDate() ?? new Date();
    return new Date(base.getTime() + 24 * 60 * 60 * 1000);
  }
  // запасной: если документа ещё нет — через 24ч от «сейчас»
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}
