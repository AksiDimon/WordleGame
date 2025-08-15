import { useEffect, useRef } from 'react';
import Tile from './Tile';
import { MAX_ROWS, WORD_LENGTH, useGameStore } from './store';
import { saveGameResult } from '../../services/game';
import { useAuth } from '../auth/auth.store';
const BOARD_ROW = 6;
export default function Board() {
  const rows = useGameStore((s) => s.rows);
  const current = useGameStore((s) => s.current);
  const status = useGameStore((s) => s.status);
  const answer = useGameStore((s) => s.answer.toUpperCase());
  const { user } = useAuth();

  const savedRef = useRef(false);

  useEffect(() => {
    if (!user?.uid) return;

    // твои условия: победа, если ответ уже в rows; поражение, если строк 6 и ответ не угадан
    const isWin  = rows.includes(answer);
    const isLose = !isWin && rows.length === MAX_ROWS;

    if ((isWin || isLose) && !savedRef.current) {
      savedRef.current = true;


      saveGameResult(user.uid)
      .catch(err => {
        console.error(err);
        // если нужно повторить попытку при ошибке:
        savedRef.current = false;
      });
    }

    // если началась новая игра (например reset), разрешим следующее сохранение
    if (!isWin && !isLose) {
      savedRef.current = false;
    }
  }, [rows, answer, user?.uid]);
// console.log(status);
//   const savedRef = useRef(false);
//   useEffect(() => {
//     if (rows.includes(answer.toUpperCase())) {
//       console.log('you won');
//       if (user?.uid) {
//         saveGameResult(user.uid);
//       }
//     } else if (
//       !rows.includes(answer.toUpperCase()) &&
//       rows.length === BOARD_ROW
//     ) {
//       if (user?.uid) {
//         saveGameResult(user.uid);
//       }
//       console.log('you lost');
//     } else {
//       console.log('progress');
//     }
//   }, [rows, answer]);
  console.log(answer, '+', rows, '😍');
  const rowsEls: JSX.Element[] = [];
  for (let r = 0; r < MAX_ROWS; r++) {
    const submitted = r < rows.length;
    const isCurrent = r === rows.length && status === 'playing';
    const word = submitted ? rows[r] : isCurrent ? current : '';

    rowsEls.push(
      // ↓ уменьшаем gap на md
      <div key={r} className="grid grid-cols-5 gap-1.5 md:gap-1">
        {Array.from({ length: WORD_LENGTH }).map((_, c) => {
          const ch = word[c] ?? '';
          let st: 'absent' | 'present' | 'correct' | undefined;

          if (submitted) {
            if (rows[r][c] === answer[c]) st = 'correct';
            else if (answer.includes(rows[r][c])) st = 'present';
            else st = 'absent';
          }

          return <Tile key={c} letter={ch} status={st} animated={submitted} />;
        })}
      </div>
    );
  }

  // лучше явно сузить контейнер до контента и центрировать
  return (
    <div
      className="w-fit mx-auto grid gap-1.5 md:gap-1"
      style={{ gridTemplateRows: `repeat(${MAX_ROWS}, minmax(0,1fr))` }}
    >
      {rowsEls}
    </div>
  );
}

//Здесь для показа статусов по завершённым строкам я вычисляю их на лету: для точной логики мы уже считаем в редьюсере, но для UI этого достаточно. Позже, когда подключим БД/валидацию — вынесем в общее место.
