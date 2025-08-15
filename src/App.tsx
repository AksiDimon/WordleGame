import { Link, Outlet } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { useAuth } from './features/auth/auth.store';
import ThemeToggle from './features/theme/ThemeToggle';
import { useEffect } from 'react';
import { getDailyWord } from './services/getDailyWord';
import { useGameStore } from './features/game/store';

// src/data/words.ts
export const words: string[] = [
  "apple", "grape", "crane", "light", "stone",
  "table", "chair", "bread", "flame", "house",
  "plant", "river", "smile", "cloud", "dream",
  "water", "earth", "sweet", "green", "beach",
  "drink", "sleep", "grass", "music", "sound",
  "paper", "brush", "dance", "sharp", "shine",
  "blood", "heart", "brain", "sword", "magic",
  "horse", "sheep", "tiger", "zebra", "whale",
  "eagle", "crowd", "fruit", "lemon", "pearl",
  "stone", "shell", "sugar", "spice", "honey",
  "ocean", "beast", "storm", "windy", "snowy",
  "flock", "track", "field", "woods", "mines",
  "crown", "torch", "glass", "steel", "brass",
  "round", "point", "angle", "edges", "curve",
  "blaze", "frost", "glove", "socks", "shirt",
  "pants", "shoes", "boots", "scarf", "cloak",
  "bloom", "seeds", "roots", "leaves", "trunk",
  "tower", "floor", "walls", "doors", "steps",
  "giant", "fairy", "witch", "ghost", "angel"
];

export default function App() {
  const { user, loading } = useAuth();
  const setDayAnswer = useGameStore((s) => s.setDayAnswerWord)
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Amsterdam',
  }).format(new Date());


  
  useEffect(() => {
    async function loadWord() {
      const todayWord = await getDailyWord(words);
      setDayAnswer(todayWord)
      console.log('Сегодняшнее слово:', todayWord);
    }

     loadWord();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
        <Link to="/" className="font-bold">
          Wordle Clone
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          <Link to={`/game`}>Играть</Link>
          <Link to="/players">Игроки</Link> 
          <Link to="/profile">Профиль</Link>
          <ThemeToggle />
          {!loading &&
            (user ? (
              <button onClick={() => signOut(auth)}>Выйти</button>
            ) : (
              <button onClick={() => signInWithPopup(auth, googleProvider)}>
                Войти
              </button>
            ))}
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
