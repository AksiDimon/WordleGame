import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase"; 


export async function getDailyWord(words: string[]) {
  const ref = doc(db, "game", "daily");

  return await runTransaction(db, async (transaction) => {
    const docSnap = await transaction.get(ref);
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      const lastUpdated = data.updatedAt?.toDate() || new Date(0);
      const now = new Date();
      const diffHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);


      if (diffHours < 24) {
        return words[data.index];
      }
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    transaction.set(ref, {
      index: randomIndex,
      updatedAt: serverTimestamp(),
    });

    return words[randomIndex];
  });
}
