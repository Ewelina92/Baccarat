import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./Overlay.module.scss";
import { useMainStore } from "../hooks/useMainStore";
import { GameStage } from "../stores/MainStore";

export const BettingOverlay = observer(() => {
  const [bet, setBet] = React.useState(0);
  const store = useMainStore();
  const {
    gameStage,
    setGameStage,
    setCurrentBet,
    setNewBet,
    betweenRoundsReset
  } = store;

  const handleBet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBet(+event.target.value);
  };

  const handlePlacedBet = () => {
    if (gameStage === GameStage.InitialBet) {
      setNewBet(bet);
      betweenRoundsReset();
    }
    if (gameStage === GameStage.SecondBet) {
      setCurrentBet(bet);
      setGameStage(GameStage.CheckForThirdCard);
    }
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <label>
          {gameStage === GameStage.InitialBet && "What is your initial bet?"}
          {gameStage === GameStage.SecondBet && "Bet more?"}
          <input type="number" min={0} max={1000} onChange={handleBet} />
        </label>
        <button onClick={handlePlacedBet}>Place bet</button>
      </div>
    </Portal>
  );
});
