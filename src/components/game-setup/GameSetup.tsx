import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game/GameField";
import { StartScreen } from "../start-screen/StartScreen";
import { ContinueOverlay } from "../overlays/ContinueOverlay";
import { GameStage } from "../../stores/MainStore";
import { BettingOverlay } from "../overlays/BettingOverlay";

export const GameSetup = observer(() => {
  const mainStore = useMainStore();
  const { gameStage } = mainStore;

  if (gameStage === GameStage.Start) {
    return <StartScreen />;
  }
  return (
    <>
      <GameField />
      {gameStage === GameStage.Continue && <ContinueOverlay />}
      {gameStage === GameStage.InitialBet && <BettingOverlay />}
      {gameStage === GameStage.SecondBet && <BettingOverlay />}
    </>
  );
});
