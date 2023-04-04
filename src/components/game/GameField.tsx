import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";

import { Card } from "../cards/Card";
import styles from "./GameField.module.scss";
import { BettingChip } from "../betting-chips/BettingChip";

const bettingChipValues = {
  1: "white",
  5: "red",
  25: "green",
  50: "blue",
  100: "black"
};
export const GameField = observer(() => {
  const { game, player, baccarat } = useMainStore();

  return (
    <div className={styles.gamefield}>
      <h1>Playing Baccarat</h1>
      <p>
        Playername: {player.playerName}
        <br />
        Cash: {player.playerMoney}
        <br />
        Current bet: {game.bet}
      </p>
      <p>Game round number: {game.gameRound}</p>
      <div className={styles.players}>
        <div className={styles.playerField}>
          {player.playerName}: {baccarat.playerPoints} <br />
          <div className={styles.cards}>
            <Card card={baccarat.playerCards[0]} />
            <Card card={baccarat.playerCards[1]} />
            {baccarat.playerCards[2] && <Card card={baccarat.playerCards[2]} />}
          </div>
        </div>
        <div className={styles.playerField}>
          Banker: {baccarat.bankerPoints}
          <br />
          <div className={styles.cards}>
            <Card card={baccarat.bankerCards[0]} />
            <Card card={baccarat.bankerCards[1]} />
            {baccarat.bankerCards[2] && <Card card={baccarat.bankerCards[2]} />}
          </div>
        </div>
      </div>
      {Object.entries(bettingChipValues).map(([value, color]) => (
        <BettingChip key={value} value={value} color={color} />
      ))}
      <p>Winner: {game.winner}</p>
    </div>
  );
});
