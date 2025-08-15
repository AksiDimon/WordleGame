import { useGameStore } from "./store";

const ROW1 = "QWERTYUIOP".split("");
const ROW2 = "ASDFGHJKL".split("");
const ROW3 = "ZXCVBNM".split("");

function keyColor(status?: "absent" | "present" | "correct") {
  if (status === "correct") return "bg-[var(--color-accent)] text-[var(--color-accent-fg)] border-[color-mix(in_oklch,var(--color-accent)_85%,black)]";
  if (status === "present") return "bg-[var(--color-attn)] text-[var(--color-attn-fg)] border-[color-mix(in_oklch,var(--color-attn)_85%,black)]";
  if (status === "absent")  return "bg-[var(--color-surface)] text-[var(--color-muted)] border-border";
  return "bg-surface text-fg border-border";
}

export default function Keyboard() {
  const keyboard = useGameStore((s) => s.keyboard);
  const input     = useGameStore((s) => s.input);
  const submit    = useGameStore((s) => s.submit);
  const backspace = useGameStore((s) => s.backspace);

  const KeyBtn = ({ label, grow, onClick }: { label: string; grow?: boolean; onClick: () => void }) => {
    const s = keyboard[label];
    return (
      <button
        type="button"
        onClick={onClick}
        className={`h-12 md:h-14 px-2 md:px-3 rounded-xl border text-sm md:text-base font-semibold ${keyColor(s)} ${
          grow ? "col-span-2" : ""
        } shadow-[0_6px_0_rgba(0,0,0,.25)] active:translate-y-[2px] active:shadow-none transition-all`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="select-none w-full max-w-[600px] mx-auto grid gap-2 mt-6">
      <div className="grid grid-cols-10 gap-2">
        {ROW1.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => input(k)} />
        ))}
      </div>
      <div className="grid grid-cols-9 gap-2 px-4">
        {ROW2.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => input(k)} />
        ))}
      </div>
      <div className="grid grid-cols-11 gap-2">
        <KeyBtn label="Enter" grow onClick={() => submit()} />
        {ROW3.map((k) => (
          <KeyBtn key={k} label={k} onClick={() => input(k)} />
        ))}
        <KeyBtn label="⌫" grow onClick={() => backspace()} />
      </div>
    </div>
  );
}


//Сейчас раскладка EN QWERTY. Если захочешь RU — заменим массивы ROW* на кириллицу и изменим фильтр в usePhysicalKeyboard на /^[А-ЯЁ]$/i.