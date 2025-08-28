import { useEffect, useState } from 'react';

import IconHelp from '../components/icons/IconHelp';
import Board from '../features/game/Board';
import EndGameModal from '../features/game/EndGameModal';
import HowToPlayModal from '../features/game/HowToPlayModal';
import Keyboard from '../features/game/Keyboard';
import { useGameStore } from '../features/game/store';
import { usePhysicalKeyboard } from '../features/game/usePhysicalKeyboard';
import InvalidToast from '../features/ui/InvalidToast';

export default function GamePage() {
  const status = useGameStore((s) => s.status);
  const reset = useGameStore((s) => s.reset);
  const [openSettings, setOpenSettings] = useState(false);
  usePhysicalKeyboard(status !== 'playing');

  useEffect(() => {
    return () => {
      reset(); 
    };
  }, [reset]);


  return (
    <div className="max-w-[600px] mx-auto py-6 space-y-6 relative">
      <button
        type="button"
        onClick={() => setOpenSettings(true)}
        className="absolute top-0 right-1 inline-flex items-center gap-2 btn btn-ghost"
        title="Правила"
        aria-label="Правила"
      >
        <IconHelp className="w-5 h-5" />
        <span className="hidden sm:inline">Правила</span>
      </button>
      <header className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Игра</h2>
      </header>

      <div className="flex justify-center">
        <Board />
      </div>
      <Keyboard />

      <EndGameModal />
      <InvalidToast />

      <HowToPlayModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </div>
  );
}

