import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../hooks/useMainStore";

import { Card } from "./cards/Card";
import styles from "./GameField.module.scss";

export const GameField = observer(() => {
  const store = useMainStore();
  const {
    gameRound,
    playerName,
    bet,
    playerCards,
    bankerCards,
    playerMoney,
    winner,
    playerPoints,
    bankerPoints
  } = store;

  return (
    <div className={styles.gamefield}>
      <h1>Playing Baccarat</h1>
      <p>
        Playername: {playerName}
        <br />
        Cash: {playerMoney}
        <br />
        Current bet: {bet}
      </p>
      <p>Game round number: {gameRound}</p>
      <div className={styles.players}>
        <div className={styles.playerField}>
          {playerName}: {playerPoints} <br />
          <div className={styles.cards}>
            <Card card={playerCards[0]} />
            <Card card={playerCards[1]} />
            {/* <Card face={playerCards[0].face} suit={playerCards[0].suit} />
            <Card face={playerCards[1].face} suit={playerCards[1].suit} /> */}
            {playerCards[2] && (
              <Card card={playerCards[2]} />
              // <Card face={playerCards[2].face} suit={playerCards[2].suit} />
            )}
          </div>
        </div>
        <div className={styles.playerField}>
          Banker: {bankerPoints}
          <br />
          <div className={styles.cards}>
            <Card card={bankerCards[0]} />
            <Card card={bankerCards[1]} />
            {/* <Card face={bankerCards[0].face} suit={bankerCards[0].suit} />
            <Card face={bankerCards[1].face} suit={bankerCards[1].suit} /> */}
            {bankerCards[2] && (
              <Card card={bankerCards[2]} />
              // <Card face={bankerCards[2].face} suit={bankerCards[2].suit} />
            )}
          </div>
        </div>
      </div>
      <p>Winner: {winner}</p>
    </div>
  );
});
