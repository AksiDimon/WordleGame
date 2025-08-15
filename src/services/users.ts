import { db } from "../firebase";
import {
  doc, setDoc, getDoc, getDocs, collection,
  orderBy, limit, query, serverTimestamp, increment, updateDoc 
} from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";

export type PublicUser = {
  id: string;
  name: string;
  photoURL?: string | null;
  email?: string | null;
  gamesPlayed: number;
  gamesWon?: number;   // ← новое поле в типе
  gamesLost?: number;  // ← новое поле в типе
  lastPlayedAt?: unknown;
};

export async function ensureUserDocument(u: FirebaseUser) {
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    // создаём ОДИН РАЗ, ставим gamesPlayed: 0
    await setDoc(ref, {
      id: u.uid,
      name: u.displayName ?? (u.email ?? "Anonymous"),
      photoURL: u.photoURL ?? null,
      email: u.email ?? null,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // при следующих логинах НЕ трогаем gamesPlayed и createdAt
    await updateDoc(ref, {
      name: u.displayName ?? (u.email ?? "Anonymous"),
      photoURL: u.photoURL ?? null,
      email: u.email ?? null,
      updatedAt: serverTimestamp(),
    });
  }
}

export async function bumpGamesPlayed(uid: string) {
  const ref = doc(db, "users", uid);
  // увеличиваем всегда на 1
  await updateDoc(ref, {
    gamesPlayed: increment(1),
    lastPlayedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUsersTop(n = 50): Promise<PublicUser[]> {
  const q = query(collection(db, "users"), orderBy("gamesPlayed", "desc"), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as PublicUser[];
}

export async function getUser(uid: string): Promise<PublicUser | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as any) } as PublicUser) : null;
}
