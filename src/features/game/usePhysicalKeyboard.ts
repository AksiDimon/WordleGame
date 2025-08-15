import { useEffect } from "react";
import { useGameStore } from "./store";

function isTextInput(el: EventTarget | null): boolean {
  const e = el as HTMLElement | null;
  const t = e?.tagName?.toLowerCase();
  return t === "input" || t === "textarea" || e?.getAttribute?.("contenteditable") === "true";
}

export function usePhysicalKeyboard(disabled?: boolean) {
  useEffect(() => {
    if (disabled) return;

    function onKeyDown(ev: KeyboardEvent) {
      if (isTextInput(ev.target)) return;
      const { input, backspace, submit } = useGameStore.getState();

      const k = ev.key;
      if (k === "Enter") { ev.preventDefault(); submit(); return; }
      if (k === "Backspace") { ev.preventDefault(); backspace(); return; }
      if (/^[a-z]$/i.test(k)) input(k);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [disabled]);
}

