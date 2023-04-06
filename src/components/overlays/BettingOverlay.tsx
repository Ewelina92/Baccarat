import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./Overlay.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";

export const BettingOverlay = observer(() => {
  const [bet, setBet] = React.useState(0);
  const { game, betweenRoundsReset } = useMainStore();

  const handleBet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBet(+event.target.value);
  };

  const handlePlacedBet = () => {
    if (game.gameStage === GameStage.InitialBet) {
      // game.setNewBet(bet);
      betweenRoundsReset();
    }
    if (game.gameStage === GameStage.SecondBet) {
      // game.setCurrentBet(bet);
      game.setGameStage(GameStage.CheckForThirdCard);
    }
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <label htmlFor="bet">
          {game.gameStage === GameStage.InitialBet &&
            "What is your initial bet?"}
          {game.gameStage === GameStage.SecondBet && "Bet more?"}
          <input
            id="bet"
            type="number"
            min={0}
            max={1000}
            onChange={handleBet}
          />
        </label>
        <button type="button" onClick={handlePlacedBet}>
          Place bet
        </button>
      </div>
    </Portal>
  );
});
