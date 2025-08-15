import { useGameStore } from "./store";

const ROW1 = "QWERTYUIOP".split("");
const ROW2 = "ASDFGHJKL".split("");
const ROW3 = "ZXCVBNM".split("");

function keyColor(status?: "absent" | "present" | "correct") {
  if (status === "correct") return "bg-emerald-500 border-emerald-500 text-zinc-950";
  if (status === "present") return "bg-amber-400 border-amber-400 text-zinc-950";
  if (status === "absent")  return "bg-zinc-700 border-zinc-700 text-zinc-100";
  return "bg-zinc-200 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700";
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
        className={`h-12 md:h-14 px-2 md:px-3 rounded-lg border text-sm md:text-base font-semibold ${keyColor(s)} ${
          grow ? "col-span-2" : ""
        }`}
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