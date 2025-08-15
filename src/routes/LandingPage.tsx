import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../features/auth/auth.store";

export default function LandingPage() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" })
    .format(new Date());
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Добро пожаловать!</h1>

      <p>Сыграй сегодняшнюю игру или войди в аккаунт:</p>
      <div className="flex gap-4 flex-wrap">
        <Link to={`/game/${today}`} className="underline">Играть сегодня</Link>
        <Link to="/profile" className="underline">Профиль</Link>
      </div>
      <AuthCard />
      {!user && <p className="opacity-70">После входа прогресс и статистика будут сохраняться в аккаунте.</p>}
    </div>
  );
}

