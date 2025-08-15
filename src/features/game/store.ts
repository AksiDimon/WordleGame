import { create, type StateCreator } from "zustand";

export type LetterState = "absent" | "present" | "correct";
export type GameStatus  = "playing" | "won" | "lost";

export const WORD_LENGTH = 5;
export const MAX_ROWS    = 6;

function clampWord(s: string) {
  return s.slice(0, WORD_LENGTH).toUpperCase();
}

function scoreGuess(answer: string, guess: string): LetterState[] {
  const A = answer.toUpperCase().split("");
  const G = guess.toUpperCase().split("");
  const res: LetterState[] = Array(WORD_LENGTH).fill("absent");
  const used: boolean[] = Array(WORD_LENGTH).fill(false);

  // pass 1: correct
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (G[i] === A[i]) { res[i] = "correct"; used[i] = true; }
  }
  // pass 2: present
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (res[i] === "correct") continue;
    const idx = A.findIndex((ch, j) => !used[j] && ch === G[i]);
    if (idx !== -1) { res[i] = "present"; used[idx] = true; }
  }
  return res;
}

function promote(a?: LetterState, b?: LetterState): LetterState | undefined {
  if (a === "correct" || b === "correct") return "correct";
  if (a === "present" || b === "present") return "present";
  if (a === "absent"  || b === "absent")  return "absent";
  return undefined;
}

export type GameStore = {
  day: string;
  answer: string;
  rows: string[];                       // завершённые догадки (UPPERCASE)
  current: string;                      // текущий ввод
  status: GameStatus;
  keyboard: Record<string, LetterState>;

  init: (day: string, answer: string, resumeRows?: string[]) => void;
  input: (ch: string) => void;
  backspace: () => void;
  submit: () => void;
  reset: () => void;
  setDayAnswerWord: (word: string) => void;
  getScoredRow: (rowIndex: number) => LetterState[] | null;
};

// ❗️ Больше НЕ указываем tuple для persist.
// Можно вообще обойтись без StateCreator, но оставлю для наглядности.
const creator: StateCreator<GameStore, [], [], GameStore> = (set, get) => ({
  day: "",
  answer: "",
  rows: [],
  current: "",
  status: "playing",
  keyboard: {},

  setDayAnswerWord: (word) => set({ answer: word.toUpperCase() }),

  init: (day, answer, resumeRows) => {
    set({
      day,
      answer: answer.toUpperCase(),
      rows: resumeRows?.map(clampWord) ?? [],
      current: "",
      status: "playing",
      keyboard: {},
    });
  },

  input: (ch) => {
    const { status, current } = get();
    if (status !== "playing" || current.length >= WORD_LENGTH) return;
    const up = ch.toUpperCase();
    if (!/^[A-Z]$/.test(up)) return;
    set({ current: current + up });
  },

  backspace: () => {
    const { status, current } = get();
    if (status !== "playing" || current.length === 0) return;
    set({ current: current.slice(0, -1) });
  },

  submit: () => {
    const { status, current, answer, rows, keyboard } = get();
    if (status !== "playing" || current.length !== WORD_LENGTH) return;

    const guess  = current.toUpperCase();
    const scored = scoreGuess(answer, guess);

    // обновляем сводный статус клавиш
    const kb = { ...keyboard };
    for (let i = 0; i < WORD_LENGTH; i++) {
      const key = guess[i];
      kb[key] = promote(kb[key], scored[i])!;
    }

    const nextRows = [...rows, guess];
    const won  = guess === answer;
    const lost = !won && nextRows.length >= MAX_ROWS; // ← не жёсткая "6"

    set({
      rows: nextRows,
      current: "",
      keyboard: kb,
      status: won ? "won" : lost ? "lost" : "playing",
    });
  },

  reset: () => set({ rows: [], current: "", keyboard: {}, status: "playing" }),

  getScoredRow: (rowIndex) => {
    const { rows, answer } = get();
    const guess = rows[rowIndex];
    if (!guess) return null;
    return scoreGuess(answer, guess);
  },
});

// ✅ Правильный экспорт стора без persist
export const useGameStore = create<GameStore>(creator);
