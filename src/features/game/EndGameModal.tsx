import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import cls from './EndModal.module.css';
import { useGameStore } from './store';
import Modal from '../../components/Modal';

type Variant = {
  headerTone: string; 
  bodyTone: string; 
  accentBorder: string; 
  buttonTone: string;
  icon: string; 
  title: string;
  subtitle: string;
};

const BASE = {
  header: 'p-5 relative border-b',
  body: 'p-5 space-y-4',
  iconWrap: 'w-9 h-9 rounded-full grid place-items-center bg-white/20',
  closeBtn:
    'absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center border border-white/30 hover:bg-white/10 cursor-pointer',
  ctaBtn: 'px-4 py-2 rounded-xl border font-semibold text-center',
};

const WIN: Variant = {
  headerTone: 'bg-emerald-600/90 text-white',
  bodyTone: 'bg-emerald-50 dark:bg-emerald-950/30',
  accentBorder: 'border-emerald-500',
  buttonTone:
    'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600',
  icon: '✓',
  title: 'Победа!',
  subtitle: 'Следующая загадка откроется завтра. До новых встреч!',
};

const LOSE: Variant = {
  headerTone: 'bg-rose-600/90 text-white',
  bodyTone: 'bg-rose-50 dark:bg-rose-950/80',
  accentBorder: 'border-rose-500',
  buttonTone: 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600',
  icon: '☹︎',
  title: 'Увы, не в этот раз',
  subtitle: 'Попробуешь завтра? Новая загадка будет доступна уже завтра!',
};

export default function EndGameModal() {
  const status = useGameStore((s) => s.status);
  const answer = useGameStore((s) => s.answer);

  const [dismissed, setDismissed] = useState(false);
  const isFinal = status === 'won' || status === 'lost';
  const isWin = status === 'won';
  const open = isFinal && !dismissed;

  useEffect(() => {
    if (isFinal) setDismissed(false);
  }, [isFinal, status]);

  const v = useMemo<Variant>(() => (isWin ? WIN : LOSE), [isWin]);

  const close = () => setDismissed(true);

  return (
    <div className={open ? cls.backdrop : ''}>
      <Modal open={open} onClose={close} blockBackdrop={false}>
        
        <div className={`${BASE.header} ${v.headerTone} ${cls.content}`}>
          
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className={BASE.closeBtn}
          >
            <span className="text-base leading-none">✕</span>
          </button>

          <div className="flex items-center gap-3">
            <div className={BASE.iconWrap}>
              <span className="text-xl leading-none">{v.icon}</span>
            </div>

            <div>
              <h3 id="endgame-title" className="text-lg font-bold">
                {v.title}
              </h3>
              <p className="text-sm opacity-90">{v.subtitle}</p>
            </div>
          </div>
        </div>

        <div className={`${BASE.body} ${v.bodyTone} ${v.accentBorder}`}>
          {!isWin && (
            <div className="text-center">
              <div className="text-sm opacity-70">Слово дня было</div>
              <div className="mt-1 text-2xl font-extrabold tracking-widest">
                {answer?.toUpperCase()}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/players"
              className={`${BASE.ctaBtn} ${v.buttonTone}`}
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
