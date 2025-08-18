import { useEffect, useRef } from "react";

import Tile from "./Tile";

type Props = { open: boolean; onClose: () => void };

export default function HowToPlayModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;


  const Badge = ({ ch, kind }: { ch: string; kind: "absent"|"present"|"correct" }) => {
    const cls =
      kind === "correct"
        ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
        : kind === "present"
        ? "bg-[var(--color-attn)] text-[var(--color-attn-fg)]"
        : "bg-[var(--color-surface)] text-[var(--color-muted)]";
    return (
      <span className={`inline-grid place-items-center rounded-md px-1.5 h-6 min-w-6 text-xs font-extrabold border ${cls} border-[var(--color-border)] align-middle`}>
        {ch}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50">
      
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-100"
        onClick={onClose}
      />
      
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Как играть"
        className="panel absolute left-1/2 top-8 -translate-x-1/2 w-[min(92vw,720px)] p-0 overflow-hidden
                   animate-[modalIn_.18s_ease-out] 
                   [@keyframes_modalIn_]{from{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%,0)}}"
      >
        
        <div className="flex items-center justify-between px-4 py-3 bg-surface/70 border-b border-border">
          <h3 className="text-lg font-semibold">Как играть</h3>
          <button
            className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-border"
            onClick={onClose}
            title="Закрыть"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        
        <div className="p-5 space-y-5 text-sm">
          <p className="text-center max-w-prose mx-auto">
            Угадайте загаданное слово из пяти букв за <strong>6</strong> попыток.
            После каждой попытки плитки меняют цвет и показывают, насколько
            близко вы к ответу.
          </p>

          
          <div className="flex flex-col items-center gap-3">
            <div className="text-center opacity-80">Начните с любого слова, например:</div>
            <div className="grid grid-cols-5 gap-1.5">
              <Tile letter="T" />
              <Tile letter="A" status="present" />
              <Tile letter="B" />
              <Tile letter="L" status="present" />
              <Tile letter="E" status="correct" />
            </div>

            <div className="bg-surface/60 border border-border rounded-xl p-3 max-w-[640px] text-left space-y-2">
              <div className="flex items-center gap-2">
                <Badge ch="T" kind="absent" /> , <Badge ch="B" kind="absent" />
                <span className="opacity-80">— этих букв нет в слове.</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge ch="A" kind="present" /> , <Badge ch="L" kind="present" />
                <span className="opacity-80">— есть в слове, но стоят не на своих местах.</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge ch="E" kind="correct" />
                <span className="opacity-80">— буква есть и стоит на верном месте.</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="opacity-80">Попробуйте найти совпадающие буквы:</div>
            <div className="grid grid-cols-5 gap-1.5 place-content-center">
              <Tile letter="F" status="correct" />
              <Tile letter="L" status="correct" />
              <Tile letter="A" status="correct" />
              <Tile letter="S" />
              <Tile letter="H" />
            </div>
            <div className="opacity-80">Почти!</div>
            <div className="grid grid-cols-5 gap-1.5 place-content-center">
              <Tile letter="F" status="correct" />
              <Tile letter="L" status="correct" />
              <Tile letter="A" status="correct" />
              <Tile letter="M" status="correct" />
              <Tile letter="E" status="correct" />
            </div>
            <div className="font-semibold">Готово! 🏆</div>
          </div>

          <div className="text-center">
            <button className="btn btn-primary" onClick={onClose}>Понятно!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
