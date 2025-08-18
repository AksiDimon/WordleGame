import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetAt?: Date | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!targetAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetAt]);

  const ms = Math.max(0, (targetAt?.getTime() ?? 0) - now);

  const parts = useMemo(() => {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return { d, h, m, s: sec };
  }, [ms]);

  return { ms, ...parts };
}
