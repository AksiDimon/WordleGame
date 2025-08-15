import styles from "./InvalidToast.module.css";
import { useGameStore } from "../game/store";
import { useEffect } from "react";

/**
 * Показывает анимированный баннер при невалидной попытке.
 * Никакого состояния: ключ зависит от invalidTick, поэтому анимация
 * запускается заново при каждом повторном Enter.
 */
export default function InvalidToast() {
  const invalidTick   = useGameStore((s) => s.invalidTick);
  const invalidReason = useGameStore((s) => s.invalidReason);
  const setInvalidReasonStatus = useGameStore((s) => s.setInvalidReason);
    useEffect(() => {
    return () => setInvalidReasonStatus(null)
  }, []);

  if (!invalidReason) return null;
  console.log(invalidReason, '😍')

  const text =
    invalidReason === "length"
      ? "Слишком короткое слово"
      : "Такого слова нет в словаре";

  // ключ заставляет React пересоздать элемент и переиграть CSS-анимацию
  const kindClass = invalidReason === "length" ? styles.warning : styles.error;

  return (
    <div key={invalidTick} className={`${styles.toast} ${kindClass}`}>
      {text}
    </div>
  );
}
