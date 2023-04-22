import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game-fields/GameField";
import { StartOverlay } from "../overlays/StartOverlay";
import { GameStage } from "../../stores/gameStore";

export const GameSetup = observer(() => {
  const { game } = useMainStore();

  return (
    <>
      <GameField />
      {game.gameStage === GameStage.Start && <StartOverlay />}
    </>
  );
});
