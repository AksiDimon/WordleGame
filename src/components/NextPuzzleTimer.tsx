import { useEffect, useState } from "react";
import { getNextRevealAt } from "../services/daily";
import { useCountdown } from "../features/game/useCountdown";

export default function NextPuzzleTimer() {
  const [target, setTarget] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;
    getNextRevealAt().then((d) => mounted && setTarget(d));
    return () => { mounted = false; };
  }, []);

  const { d, h, m, s, ms } = useCountdown(target);

  if (!target) {
    return (
      <div className="text-sm opacity-70">
        Загружаем время следующей загадки…
      </div>
    );
  }

  const done = ms <= 0;
  if (done) {
    return (
      <div className="text-sm font-medium text-[var(--color-accent-fg)] bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 rounded-lg px-3 py-2 inline-block">
        Новая игра уже доступна!
      </div>
    );
  }

  return (
    <div className="text-l font-medium bg-surface/60 border border-border rounded-lg px-3 py-2 inline-flex items-baseline gap-2">
      <span className="opacity-70">До следующей загадки:</span>
      <span className="tabular-nums">
        {d > 0 && (<><strong>{d}</strong><span className="opacity-70">д </span></>)}
        <strong>{String(h).padStart(2, "0")}</strong>
        <span className="opacity-70">:</span>
        <strong>{String(m).padStart(2, "0")}</strong>
        <span className="opacity-70">:</span>
        <strong>{String(s).padStart(2, "0")}</strong>
      </span>
    </div>
  );
}
