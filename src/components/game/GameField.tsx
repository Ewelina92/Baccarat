import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import winSound from "../../sounds/win-sound.mp3";

import styles from "./GameField.module.scss";
import { BettingControls } from "../betting-controls/BettingControls";
import { GameStage } from "../../stores/gameStore";
import { useAudio } from "../../hooks/useAudio";
import { VolumeButton } from "../game-setup/VolumeButton";
import { Cards } from "../cards/Cards";

export const GameField = observer(() => {
  const { game, player, baccarat, soundVolume, didWin } = useMainStore();
  const winAudio = useAudio(winSound, { volume: +soundVolume });

  useEffect(() => {
    if (didWin) {
      winAudio.play();
    }
  }, [didWin]);

  const hours = Math.floor(game.time / 3600);
  const minutes = Math.floor(game.time / 60) % 60;
  const seconds = game.time % 60;

  const hoursAsString = hours.toString().padStart(2, "0");
  const minutesAsString = minutes.toString().padStart(2, "0");
  const secondsAsString = seconds.toString().padStart(2, "0");

  const timeAsString = `${hoursAsString}:${minutesAsString}:${secondsAsString}`;

  return (
    <>
      <VolumeButton />
      {game.winner && (
        <div className={styles.winnerContainer}>
          <span className={styles.winner}>{game.winner}</span>
        </div>
      )}
      <p className={styles.time}>{timeAsString}</p>
      <div className={styles.gamefield}>
        <div className={styles.top}>
          <h1>Baccarat</h1>
          <div className={styles.info}>
            <p className={styles.status}>
              {game.gameStage === GameStage.InitialBet
                ? "Place your bets"
                : "Playing"}{" "}
            </p>
          </div>
          <div className={styles.playerField}>
            <p>You have: {baccarat.playerPoints}</p>
            <Cards cards={baccarat.playerCards} revertDirection />
          </div>
          <div className={styles.bankerField}>
            <p>Banker has: {baccarat.bankerPoints}</p>
            <Cards cards={baccarat.bankerCards} revertDirection={false} />
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
