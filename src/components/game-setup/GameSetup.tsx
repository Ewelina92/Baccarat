import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game/GameField";
import { StartOverlay } from "../overlays/StartOverlay";

export const GameSetup = observer(() => {
  const { game } = useMainStore();

  return (
    <>
      <GameField />
      {game.gameRound === 0 && <StartOverlay />}
    </>
  );
});
