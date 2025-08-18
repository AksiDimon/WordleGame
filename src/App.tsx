import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import wordsTop500 from './data/words_top500';
import { useGameStore } from './features/game/store';
import { getDailyWord } from './services/getDailyWord';

export default function App() {
  const setDayAnswer = useGameStore((s) => s.setDayAnswerWord)

  useEffect(() => {
    async function loadWord() {
      try {
        const todayWord = await getDailyWord(wordsTop500);
        setDayAnswer(todayWord);
        // console.log('Сегодняшнее слово:', todayWord);
      } catch (err) {
        console.error('Не удалось загрузить слово:', err);
      }
    }

    void loadWord();
  }, [setDayAnswer]);

  return (
    <div 
    
    className="min-h-screen text-fg game-bg"
    // className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
    >
      <Header/>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
