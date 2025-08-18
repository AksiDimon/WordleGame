import { useEffect } from "react";

import styles from "./InvalidToast.module.css";
import { useGameStore } from "../game/store";

export default function InvalidToast() {
  const invalidTick   = useGameStore((s) => s.invalidTick);
  const invalidReason = useGameStore((s) => s.invalidReason);
  const setInvalidReasonStatus = useGameStore((s) => s.setInvalidReason);
    useEffect(() => {
      
    return () => setInvalidReasonStatus(null)
  }, [setInvalidReasonStatus]);

  if (!invalidReason) return null;


  const text =
    invalidReason === "length"
      ? "Слишком короткое слово"
      : "Такого слова нет в словаре";


  const kindClass = invalidReason === "length" ? styles.warning : styles.error;

  return (
    <div key={invalidTick} className={`${styles.toast} ${kindClass}`}>
      {text}
    </div>
  );
}
