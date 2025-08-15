import { words } from "./words";

/** Храним множество в UPPERCASE для быстрых O(1) проверок */
const WORDS_SET: ReadonlySet<string> = new Set(
  words.map((w) => w.toUpperCase())
);

const WORD_LENGTH = 5
/** Проверка существования слова в словаре (регистр не важен) */
export function isValidWord(w: string): boolean {
  return w.length === WORD_LENGTH &&  WORDS_SET.has(w.toUpperCase());
}
