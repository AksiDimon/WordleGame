import { create, type StateCreator } from "zustand";

import { isValidWord } from "../../data/dictionary";      



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


  for (let i = 0; i < WORD_LENGTH; i++) {
    if (G[i] === A[i]) { res[i] = "correct"; used[i] = true; }
  }

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

type InvalidReasonStatus  = null | "length" | "notfound";
export type GameStore = {
  day: string;
  answer: string;
  rows: string[];                       
  current: string;                      
  status: GameStatus;
  keyboard: Record<string, LetterState>;
  invalidTick: number;                    
  invalidReason: InvalidReasonStatus

  init: (day: string, answer: string, resumeRows?: string[]) => void;
  input: (ch: string) => void;
  backspace: () => void;
  submit: () => void;
  reset: () => void;
  setDayAnswerWord: (word: string) => void;
  getScoredRow: (rowIndex: number) => LetterState[] | null;
  setInvalidReason: (status: InvalidReasonStatus) => void
};


const creator: StateCreator<GameStore, [], [], GameStore> = (set, get) => ({
  day: "",
  answer: "",
  rows: [],
  current: "",
  status: "playing",
  keyboard: {},
  invalidTick: 0,
  invalidReason: null,


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

  setInvalidReason: (status) => {
    set({invalidReason: status })
  },

  submit: () => {
    const { status, current, answer, rows, keyboard } = get();
    if (status !== "playing" || current.length !== WORD_LENGTH) return;

    const guess  = current.toUpperCase();
    const scored = scoreGuess(answer, guess);

      if (current.length !== WORD_LENGTH) {
      set((s) => ({ invalidTick: s.invalidTick + 1, invalidReason: "length" }));
      return;
    }

    if (!isValidWord(guess)) {
      set((s) => ({ invalidTick: s.invalidTick + 1, invalidReason: "notfound" }));
      return;
    }


    const kb = { ...keyboard };
    for (let i = 0; i < WORD_LENGTH; i++) {
      const key = guess[i];
      kb[key] = promote(kb[key], scored[i])!;
    }

    const nextRows = [...rows, guess];
    const won  = guess === answer;
    const lost = !won && nextRows.length >= MAX_ROWS; 

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


export const useGameStore = create<GameStore>(creator);
