// src/components/SyncBadge.tsx

// для проверки синхронизации с firestore
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function SyncBadge({ uid }: { uid: string }) {
  const [text, setText] = useState("—");

  useEffect(() => {
    const ref = doc(db, "users", uid);
    const unsub = onSnapshot(ref, { includeMetadataChanges: true }, (snap) => {
      const pending = snap.metadata.hasPendingWrites; // есть локальные несинхронные изменения
      const fromCache = snap.metadata.fromCache;      // данные из кэша (нет сети/сервер ещё не ответил)
      if (pending) setText("сохранение…");
      else if (fromCache) setText("офлайн (кэш)");
      else setText("синхронизировано ✓");             // данные подтверждены сервером
    });
    return () => unsub();
  }, [uid]);

  return <span className="text-s opacity-70">{text}</span>;
}