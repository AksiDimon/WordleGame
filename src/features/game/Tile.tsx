import cls from "./Tile.module.css";

type Props = {
  letter?: string;
  status?: "absent" | "present" | "correct";
  animated?: boolean;
};

export default function Tile({ letter = "", status, animated }: Props) {
  const base =
    "w-12 h-12 md:w-15 md:h-15 grid place-items-center rounded-lg border font-extrabold text-lg md:text-2xl uppercase select-none";
  const colors =
    status === "correct"
      ? "bg-emerald-500 border-emerald-500 text-zinc-950"
      : status === "present"
      ? "bg-amber-400 border-amber-400 text-zinc-950"
      : status === "absent"
      ? "bg-zinc-700 border-zinc-700 text-zinc-100"
      : "bg-transparent border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100";

  return (
    <div className={`${base} ${colors} ${animated ? cls.flip : ""} ${letter && !status ? cls.pop : ""}`}>
      {letter}
    </div>
  );
}
