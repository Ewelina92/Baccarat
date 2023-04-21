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
import { playAudio } from "../../utils";

export const GameField = observer(() => {
  const { game, player, baccarat, sound, didWin } = useMainStore();
  const winAudio = useAudio(winSound);

  useEffect(() => {
    if (didWin) {
      playAudio(winAudio, +sound.soundVolume);
    }
  }, [didWin]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;

    const hoursAsString = hours.toString().padStart(2, "0");
    const minutesAsString = minutes.toString().padStart(2, "0");
    const secondsAsString = seconds.toString().padStart(2, "0");

    return `${hoursAsString}:${minutesAsString}:${secondsAsString}`;
  };

  const timeAsString = formatTime(game.time);

  const balanceWithMaxTwoDec = Math.round(player.playerMoney * 100) / 100;

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
              <p className={styles.balance}>&euro; {balanceWithMaxTwoDec}</p>
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
