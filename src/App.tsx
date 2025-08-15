import { Outlet } from 'react-router-dom';
import { useAuth } from './features/auth/auth.store';

import { useEffect } from 'react';
import { getDailyWord } from './services/getDailyWord';
import { useGameStore } from './features/game/store';
import wordsTop500 from './data/words_top500';
import { Header } from './components/Header';
// src/data/words.ts
// export const words: string[] = [
//   "apple", "grape", "crane", "light", "stone",
//   "table", "chair", "bread", "flame", "house",
//   "plant", "river", "smile", "cloud", "dream",
//   "water", "earth", "sweet", "green", "beach",
//   "drink", "sleep", "grass", "music", "sound",
//   "paper", "brush", "dance", "sharp", "shine",
//   "blood", "heart", "brain", "sword", "magic",
//   "horse", "sheep", "tiger", "zebra", "whale",
//   "eagle", "crowd", "fruit", "lemon", "pearl",
//   "stone", "shell", "sugar", "spice", "honey",
//   "ocean", "beast", "storm", "windy", "snowy",
//   "flock", "track", "field", "woods", "mines",
//   "crown", "torch", "glass", "steel", "brass",
//   "round", "point", "angle", "edges", "curve",
//   "blaze", "frost", "glove", "socks", "shirt",
//   "pants", "shoes", "boots", "scarf", "cloak",
//   "bloom", "seeds", "roots", "leaves", "trunk",
//   "tower", "floor", "walls", "doors", "steps",
//   "giant", "fairy", "witch", "ghost", "angel"
// ];

export default function App() {
  const setDayAnswer = useGameStore((s) => s.setDayAnswerWord)

  useEffect(() => {
    async function loadWord() {
      const todayWord = await getDailyWord(wordsTop500);
      setDayAnswer(todayWord)
      console.log('Сегодняшнее слово:', todayWord);
    }

     loadWord();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header/>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
