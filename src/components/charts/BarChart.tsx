import React from 'react';

type Item = { label: string; value: number; hint?: string };

export default function BarChart({
  data,
  max = Math.max(1, ...data.map(d => d.value)),
  unit = '',
}: {
  data: Item[];
  max?: number;
  unit?: string;
}) {
  return (
    <div className="space-y-2">
      {data.map((d) => {
        const w = max ? (d.value / max) * 100 : 0;
        return (
          <div key={d.label} className="flex items-center gap-2">
            <div className="w-10 shrink-0 text-right tabular-nums text-sm opacity-70">{d.label}</div>
            <div className="flex-1 h-3 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)]/80"
                style={{ width: `${w}%` }}
                aria-label={`${d.label}: ${d.value}${unit}`}
                title={d.hint ?? `${d.value}${unit}`}
              />
            </div>
            <div className="w-12 shrink-0 tabular-nums text-sm text-right">{d.value}</div>
          </div>
        );
      })}
    </div>
  );
}
