import type { User as FirebaseUser } from "firebase/auth";
import {
  doc, setDoc, getDoc, getDocs, collection,
  orderBy, limit, query, serverTimestamp, updateDoc 
} from "firebase/firestore";

import { db } from "../firebase";

export type PublicUser = {
  id: string;
  name: string;
  photoURL?: string | null;
  email?: string | null;
  gamesPlayed: number;
  gamesWon?: number;   
  gamesLost?: number;  
  lastPlayedAt?: unknown;
};

export async function ensureUserDocument(u: FirebaseUser) {
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
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
    await updateDoc(ref, {
      name: u.displayName ?? (u.email ?? "Anonymous"),
      photoURL: u.photoURL ?? null,
      email: u.email ?? null,
      updatedAt: serverTimestamp(),
    });
  }
}


export async function getUsersTop(n = 50): Promise<PublicUser[]> {
  const q = query(collection(db, "users"), orderBy("gamesPlayed", "desc"), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data()) })) as PublicUser[];
}

export async function getUser(uid: string): Promise<PublicUser | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data()) } as PublicUser) : null;
}
