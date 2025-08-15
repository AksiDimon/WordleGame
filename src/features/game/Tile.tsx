import cls from "./Tile.module.css";

type Props = {
  letter?: string;
  status?: "absent" | "present" | "correct";
  animated?: boolean;
};

export default function Tile({ letter = "", status, animated }: Props) {
  const base =
    "w-12 h-12 md:w-14 md:h-14 grid place-items-center rounded-xl border-2 font-extrabold text-lg md:text-2xl uppercase select-none transition-all duration-150";
  const colors =
    status === "correct"
      ? "bg-[var(--color-accent)] border-[color-mix(in_oklch,var(--color-accent)_85%,black)] text-[var(--color-accent-fg)] shadow-[0_0_0_1px_rgba(0,0,0,.05),0_0_24px_color-mix(in_oklch,var(--color-accent)_35%,transparent)]"
      : status === "present"
      ? "bg-[var(--color-attn)] border-[color-mix(in_oklch,var(--color-attn)_85%,black)] text-[var(--color-attn-fg)] shadow-[0_0_0_1px_rgba(0,0,0,.05),0_0_24px_color-mix(in_oklch,var(--color-attn)_35%,transparent)]"
      : status === "absent"
      ? "bg-[var(--color-surface)] border-border text-[var(--color-muted)]"
      : "bg-surface border-border text-fg";


  return (
    <div className={`${base} ${colors} ${animated ? cls.flip : ""} ${letter && !status ? cls.pop : ""}`}>
      {letter}
    </div>
  );
}
