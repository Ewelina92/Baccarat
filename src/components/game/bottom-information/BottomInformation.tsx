import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../../hooks/useMainStore";
import styles from "./BottomInformation.module.scss";

export const BottomInformation = observer(() => {
  const { game, player } = useMainStore();

  const balanceWithMaxTwoDec = Math.round(player.playerMoney * 100) / 100;

  return (
    <div className={styles.bottom}>
      <div className={styles.info}>
        <p>BALANCE</p>
        <p className={styles.balance}>&euro; {balanceWithMaxTwoDec}</p>
      </div>
      <div className={styles.info}>
        <p>TOTAL BET</p>
        <p className={styles.balance}>&euro; {game.totalBet}</p>
      </div>
    </div>
  );
});
