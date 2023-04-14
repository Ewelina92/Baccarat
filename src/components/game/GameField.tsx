import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";

import { Card } from "../cards/Card";
import styles from "./GameField.module.scss";
import { BettingControls } from "../betting-chips/BettingControls";
import { GameStage } from "../../stores/gameStore";
import { CardSuit } from "../../types";

export const GameField = observer(() => {
  const { game, player, baccarat } = useMainStore();

  const fakeCard = {
    face: "fake",
    suit: CardSuit.Clover,
    value: 0,
    flipped: false
  };

  return (
    <div className={styles.gamefield}>
      <div className={styles.red}>
        <div className={styles.seventy}>
          <h1>Baccarat</h1>
          <div className={styles.info}>
            <p>Player: {player.playerName.toLocaleUpperCase()}</p>
            <p>Game round: {game.gameRound}</p>
          </div>
          <p className={styles.status}>Gamestatus... or winner {game.winner}</p>
          <div className={styles.players}>
            <div className={styles.playerField}>
              {player.playerName}: {baccarat.playerPoints} <br />
              <div className={styles.cards}>
                <Card
                  card={
                    game.gameStage === GameStage.InitialBet
                      ? fakeCard
                      : baccarat.playerCards[0]
                  }
                />
                <Card
                  card={
                    game.gameStage === GameStage.InitialBet
                      ? fakeCard
                      : baccarat.playerCards[1]
                  }
                />
                {baccarat.playerCards[2] && (
                  <Card card={baccarat.playerCards[2]} />
                )}
              </div>
            </div>
            <div className={styles.playerField}>
              Banker: {baccarat.bankerPoints}
              <br />
              <div className={styles.cards}>
                <Card
                  card={
                    game.gameStage === GameStage.InitialBet
                      ? fakeCard
                      : baccarat.bankerCards[0]
                  }
                />
                <Card
                  card={
                    game.gameStage === GameStage.InitialBet
                      ? fakeCard
                      : baccarat.bankerCards[1]
                  }
                />
                {baccarat.bankerCards[2] && (
                  <Card card={baccarat.bankerCards[2]} />
                )}
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>

      <BettingControls />
      <div className={styles.bottom}>
        <div className={styles.totalInfo}>
          <p>BALANCE</p>
          <p className={styles.balance}>&euro; {player.playerMoney}</p>
        </div>
        <div className={styles.totalInfo}>
          <p>TOTAL BET</p>
          <p className={styles.balance}>&euro; {game.totalBet}</p>
        </div>
      </div>
    </div>
  );
});
