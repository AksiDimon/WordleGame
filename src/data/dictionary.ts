import { words } from "./words";

const WORDS_SET: ReadonlySet<string> = new Set(
  words.map((w) => w.toUpperCase())
);

const WORD_LENGTH = 5
export function isValidWord(w: string): boolean {
  return w.length === WORD_LENGTH &&  WORDS_SET.has(w.toUpperCase());
}
