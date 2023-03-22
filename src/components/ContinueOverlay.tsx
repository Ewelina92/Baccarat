import React from "react";
import { Portal } from "./Portal";
import styles from "./Overlay.module.css";
import { observer } from "mobx-react";
import { useMainStore } from "../hooks/useMainStore";
import { GameStage } from "../stores/MainStore";
export const ContinueOverlay = observer(() => {
  const store = useMainStore();
  const {
    betweenRoundsReset,
    endGameReset,
    setGameStage,
    nextRoundIsPossible
  } = store;

  const continueGame = () => {
    setGameStage(GameStage.InitialBet);
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.overlayButtons}>
          {nextRoundIsPossible() && (
            <button onClick={continueGame}>Play next round</button>
          )}
          <button onClick={endGameReset}>End Game</button>
        </div>
      </div>
    </Portal>
  );
});
