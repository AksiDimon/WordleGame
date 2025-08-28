import React from 'react';

export default function HourBars({
  buckets,
  max = Math.max(1, ...Object.values(buckets)),
}: {
  buckets: Record<string, number>;
  max?: number;
}) {
  const entries = Object.entries(buckets); // [["00",n],...,"23"]
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 gap-2 sm:gap-3">
        {entries.map(([h, v]) => {
          const height = max ? Math.max(6, (v / max) * 72) : 6; // 6..72px
          return (
            <div key={h} className="flex flex-col items-center gap-1">
              <div
                className="w-3 sm:w-4 rounded-md bg-[var(--color-attn)]/80"
                style={{ height }}
                title={`${h}:00 — ${v}`}
                aria-label={`${h}:00 — ${v}`}
              />
              <div className="text-[10px] sm:text-xs tabular-nums opacity-70">{h}</div>
            </div>
          );
        })}
      </div>
      <div className="text-xs opacity-70">* Колонки показывают, во сколько чаще всего сохранялся результат игры.</div>
    </div>
  );
}
