import { useEffect, useRef } from 'react';

import { MAX_ROWS, WORD_LENGTH, useGameStore } from './store';
import Tile from './Tile';
import { saveGameResultOncePerDay, formatDay } from '../../services/game';
import { useAuth } from '../auth/auth.store';

export default function Board() {
  const rows        = useGameStore((s) => s.rows);
  const current     = useGameStore((s) => s.current);
  const status      = useGameStore((s) => s.status);
  const getScoredRow= useGameStore((s) => s.getScoredRow);
  const day         = useGameStore((s) => s.day); // если ты его инициализируешь в init(day, word)
  const { user }    = useAuth();

  const savedRef = useRef(false);

  useEffect(() => {
    if (!user?.uid) return;
    if (status !== 'won' && status !== 'lost') { savedRef.current = false; return; }
    if (savedRef.current) return;

    savedRef.current = true;

    const gameDay = day || formatDay();
    saveGameResultOncePerDay({
      uid: user.uid,
      day: gameDay,
      status,
      rows,
    }).catch(err => {
      console.error(err);
      savedRef.current = false;
    });
  }, [status, rows, user?.uid, day]);

  const rowsEls: JSX.Element[] = [];
  for (let r = 0; r < MAX_ROWS; r++) {
    const submitted = r < rows.length;
    const isCurrent = r === rows.length && status === 'playing';
    const word = submitted ? rows[r] : isCurrent ? current : '';
    const scored = submitted ? getScoredRow(r)! : null;

    rowsEls.push(
      <div key={r} className="grid grid-cols-5 gap-1.5 md:gap-1">
        {Array.from({ length: WORD_LENGTH }).map((_, c) => {
          const ch = word[c] ?? '';
          const st = submitted ? scored?.[c] : undefined;
          return <Tile key={c} letter={ch} status={st} animated={submitted} />;
        })}
      </div>
    );
  }

  return (
    <div
      className="w-fit mx-auto grid gap-1.5 md:gap-1"
      style={{ gridTemplateRows: `repeat(${MAX_ROWS}, minmax(0,1fr))` }}
    >
      {rowsEls}
    </div>
  );
}

