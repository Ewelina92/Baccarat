import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game/GameField";
import { StartScreen } from "../start-screen/StartScreen";
import { ContinueOverlay } from "../overlays/ContinueOverlay";
import { GameStage } from "../../stores/gameStore";
import { BettingOverlay } from "../overlays/BettingOverlay";

export const GameSetup = observer(() => {
  const { game } = useMainStore();

  if (game.gameStage === GameStage.Start) {
    return <StartScreen />;
  }
  return (
    <>
      <GameField />
      {game.gameStage === GameStage.Continue && <ContinueOverlay />}
      {game.gameStage === GameStage.InitialBet && <BettingOverlay />}
      {game.gameStage === GameStage.SecondBet && <BettingOverlay />}
    </>
  );
});
