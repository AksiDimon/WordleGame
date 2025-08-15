import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../features/auth/auth.store';
import NextPuzzleTimer from '../components/NextPuzzleTimer';

export default function LandingPage() {
  const { user } = useAuth();
  const nav = useNavigate();

  if (user) {
    return (
      <div className="space-y-6 flex justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-16">
            С возвращением, {user.displayName ?? 'игрок'}!
          </h1>

          <div className="panel md:max-w-xl lg:max-w-2xl p-4 flex flex-col  items-center gap-4">
            <div className="space-y-2 flex-col"> 
              <div className="text-lg font-semibold">Готов к загадке дня?</div>
              <NextPuzzleTimer />
              <div className="text-sm opacity-70">
                Спеши отгадать — будь первым в рейтинге!
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => nav('/game')}
                aria-label="Перейти к игре"
                title="Перейти к игре"
              >
                Играть сейчас
              </button>
              <Link to="/players" className="btn btn-ghost">
                Рейтинг
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // гость
  return (
    <div className="space-y-6  text-center">
      <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
      <p>Войди, чтобы сохранять прогресс и попадать в рейтинг.</p>

      <AuthCard />
    </div>
  );
}
