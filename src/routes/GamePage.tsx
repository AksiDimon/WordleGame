import { Navigate } from "react-router-dom";
import Board from "../features/game/Board";
import Keyboard from "../features/game/Keyboard";
import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../features/game/store";
import { usePhysicalKeyboard } from "../features/game/usePhysicalKeyboard";
// import { getAnswerForDay, saveGameResult } from "../services/game";
import { useAuth } from "../features/auth/auth.store";


export default function GamePage() {

  const { user } = useAuth();
  const status = useGameStore((s) => s.status);
  const rows   = useGameStore((s) => s.rows);



  usePhysicalKeyboard(status !== "playing");

  const savedRef = useRef(false);
  useEffect(() => {
    if (!user?.uid) return;
    if (status === "won" || status === "lost") {
      if (savedRef.current) return;
      savedRef.current = true;
      // saveGameResult({ uid: user.uid, day, rows, status }).catch(console.error);
    } else {
      savedRef.current = false;
    }
  }, [status, rows, user?.uid]);

  return (
    <div className="max-w-[600px] mx-auto py-6 space-y-6">
      <header className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Игра за {new Date().toLocaleDateString()}</h2>
      </header>
      <div className="flex justify-center"><Board /></div>
      <Keyboard />
    </div>
  );
}




//GameDispatchBridge — небольшой лайфхак, чтобы хук usePhysicalKeyboard мог вызывать dispatch, не будучи дочерним компонентом. Когда перейдём к полноценной логике — перенесём обработку прямо в InnerGame без этого мостика.