import React from "react";


/** Шеститайл «WORDLE» — два тайла подсвечены как в игре (accent/attn) */
export default function WordmarkTiles({ className = "h-6 w-auto" }: { className?: string }) {
  const t = [
    { ch: "W", fill: "var(--color-surface)", stroke: "var(--color-border)" },
    { ch: "O", fill: "var(--color-accent)",  stroke: "color-mix(in oklch, var(--color-accent) 85%, black)", fg: "var(--color-accent-fg)" },
    { ch: "R", fill: "var(--color-surface)", stroke: "var(--color-border)" },
    { ch: "D", fill: "var(--color-attn)",   stroke: "color-mix(in oklch, var(--color-attn) 85%, black)", fg: "var(--color-attn-fg)" },
    { ch: "L", fill: "var(--color-surface)", stroke: "var(--color-border)" },
    { ch: "E", fill: "var(--color-surface)", stroke: "var(--color-border)" },
  ];
  return (
    <svg className={className} viewBox="0 0 155 28" role="img" aria-label="Wordle Home" fill="none">
      {t.map((tile, i) => (
        <g key={i} transform={`translate(${i * 25 + 2},2)`}>
          <rect width="24" height="24" rx="6" fill={tile.fill} stroke={tile.stroke} strokeWidth="2" />
          <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="800"
            fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif"
            fill={tile.fg ?? "currentColor"}>
            {tile.ch}
          </text>
      </g>
      ))}
    </svg>
  );
}

