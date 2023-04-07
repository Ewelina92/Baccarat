import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game/GameField";
import { ContinueOverlay } from "../overlays/ContinueOverlay";
import { GameStage } from "../../stores/gameStore";
import { StartOverlay } from "../overlays/StartOverlay";

export const GameSetup = observer(() => {
  const { game } = useMainStore();

  return (
    <>
      <GameField />
      {game.gameRound === 0 && <StartOverlay />}
      {game.gameStage === GameStage.Continue && <ContinueOverlay />}
    </>
  );
});
