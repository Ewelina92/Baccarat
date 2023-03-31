import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./Overlay.module.css";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";

export const ContinueOverlay = observer(() => {
  const { game, baccarat, endGameReset } = useMainStore();

  const continueGame = () => {
    game.setGameStage(GameStage.InitialBet);
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.overlayButtons}>
          {baccarat.nextRoundIsPossible() && (
            <button type="button" onClick={continueGame}>
              Play next round
            </button>
          )}
          <button type="button" onClick={endGameReset}>
            End Game
          </button>
        </div>
      </div>
    </Portal>
  );
});
