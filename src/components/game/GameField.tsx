import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";

import { Card } from "../cards/Card";
import styles from "./GameField.module.scss";
import { BettingControls } from "../betting-chips/BettingControls";
import { GameStage } from "../../stores/gameStore";
import { CardSuit } from "../../types";

export const GameField = observer(() => {
  const { game, player, baccarat, soundVolume, toggleSound } = useMainStore();

  const fakeCard = {
    face: "fake",
    suit: CardSuit.Clover,
    value: 0,
    flipped: false
  };

  return (
    <>
      <button type="button" className={styles.sound} onClick={toggleSound}>
        {soundVolume === 1 ? (
          <span className="material-symbols-outlined">volume_up</span>
        ) : (
          <span className="material-symbols-outlined">volume_off</span>
        )}
      </button>
      {game.winner && (
        <div className={styles.winnerC}>
          <span className={styles.winner}>{game.winner}</span>
        </div>
      )}
      <div className={styles.gamefield}>
        <div className={styles.top}>
          <h1>Baccarat</h1>
          <div className={styles.info}>
            <p>{player.playerName.toLocaleUpperCase()} vs BANKER</p>
            <p className={styles.status}>
              {game.gameStage === GameStage.InitialBet ? (
                <p>Place your bets please.</p>
              ) : (
                <p>Playing...</p>
              )}{" "}
            </p>
            <p>Game round: {game.gameRound}</p>
          </div>
          <div className={styles.playerField}>
            <p>You have: {baccarat.playerPoints}</p>
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
          <div className={styles.bankerField}>
            <p>Banker has: {baccarat.bankerPoints}</p>
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
        <div className={styles.bottomField}>
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
      </div>
    </>
  );
});
