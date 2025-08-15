import { useEffect, useMemo, useState  } from "react";
import Modal from "../../components/Modal";
import { useGameStore } from "./store";
import { Link } from "react-router-dom";
import cls from "./EndModal.module.css";

export default function EndGameModal() {
  const status = useGameStore((s) => s.status);
  const answer = useGameStore((s) => s.answer);
  
  const [dismissed, setDismissed] = useState(false);
  const isFinal = status === "won" || status === "lost";
  const isWin = status === "won";
  const open = isFinal && !dismissed;

    useEffect(() => {
    // при каждом новом завершении игры показываем модалку заново
    if (isFinal) setDismissed(false);
  }, [isFinal, status]);

  const styles = useMemo(() => {
    return isWin
      ? {
          header: "bg-emerald-600/90 text-white",
          body: "bg-emerald-50 dark:bg-emerald-950/30",
          iconBg: "bg-white/20",
          icon: "✓",
          title: "Победа!",
          subtitle:
            "Следующая загадка откроется завтра. До новых встреч!",
          accent: "border-emerald-500",
          button:
            "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600",
        }
      : {
          header: "bg-rose-600/90 text-white",
          body: "bg-rose-50 dark:bg-rose-950/80",
          iconBg: "bg-white/20",
          icon: "☹︎",
          title: "Увы, не в этот раз",
          subtitle:
            "Попробуешь завтра? Новая загадка будет доступна уже завтра!",
          accent: "border-rose-500",
          button:
            "bg-rose-600 hover:bg-rose-700 text-white border-rose-600",
        };
  }, [isWin]);
const close = () => setDismissed(true);

  return (
    <div className={open ? cls.backdrop : ""}>
      {/* blockBackdrop={false} ⟵ клики по фону проходят сквозь оверлей, хедер остаётся кликабельным */}
      <Modal open={open} onClose={close} blockBackdrop={false}>
        <div className={`border-b ${styles.header} ${cls.content} p-5 relative`}>
          {/* кнопка закрытия вправо-вверх (всегда доступна) */}
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center border border-white/30 hover:bg-white/10"
          >
            <span className="text-base leading-none">✕</span>
          </button>

          <div className="flex items-center gap-3">
            {/* ЛОГО-ИКОНКА СЛЕВА:
               - при проигрыше (✕) — по твоему запросу тоже закрывает модалку
               - при победе (✓) — просто декоративная
            */}
            {isWin ? (
              <div className={`w-9 h-9 rounded-full grid place-items-center ${styles.iconBg}`}>
                <span className="text-xl leading-none">{styles.icon}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className={`w-9 h-9 rounded-full grid place-items-center ${styles.iconBg}`}
              >
                <span className="text-xl leading-none">{styles.icon}</span>
              </button>
            )}

            <div>
              <h3 id="endgame-title" className="text-lg font-bold">{styles.title}</h3>
              <p className="text-sm opacity-90">{styles.subtitle}</p>
            </div>
          </div>
        </div>

        <div className={`${styles.body} ${styles.accent} p-5 space-y-4`}>
          {!isWin && (
            <div className="text-center">
              <div className="text-sm opacity-70">Слово дня было</div>
              <div className="text-2xl font-extrabold tracking-widest mt-1">
                {answer?.toUpperCase()}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/players"
              className={`px-4 py-2 rounded-xl border font-semibold text-center ${styles.button}`}
              onClick={close}
            >
               Статистика игроков
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}