import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../hooks/useMainStore";
import { Game } from "./game/Game";
import { StartOverlay } from "./overlays/StartOverlay";
import { GameStage } from "../stores/gameStore";

export const GameSetup = observer(() => {
  const { game } = useMainStore();

  return (
    <>
      <Game />
      {game.gameStage === GameStage.Start && <StartOverlay />}
    </>
  );
});
