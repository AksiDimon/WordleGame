import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Страница не найдена</h2>
      <Link to="/" className="underline">На главную</Link>
    </div>
  );
}
