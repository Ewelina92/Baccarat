import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { BettingControls } from "../betting-controls/BettingControls";
import { GameStage } from "../../stores/gameStore";
import { VolumeButton } from "../game-setup/VolumeButton";
import { playAudio } from "../../utils";
import { PlayerField } from "./PlayerField";
import { BankerField } from "./BankerField";
import { useMainStore } from "../../hooks/useMainStore";
import { useAudio } from "../../hooks/useAudio";

import winSound from "../../sounds/win-sound.mp3";

import styles from "./GameField.module.scss";
import { BottomInformation } from "./BottomInformation";
import { Timer } from "../game-setup/Timer";

export const GameField = observer(() => {
  const { game, sound, didWin } = useMainStore();
  const winAudio = useAudio(winSound);

  useEffect(() => {
    if (didWin) {
      playAudio(winAudio, +sound.soundVolume);
    }
  }, [didWin]);

  const status = (
    <p>
      {game.gameStage === GameStage.InitialBet ? "Place your bets" : "Playing"}
    </p>
  );

  const winnerInfo = game.winner ? (
    <div className={styles.winnerContainer}>
      <span className={styles.winner}>{game.winner}</span>
    </div>
  ) : null;

  return (
    <>
      <VolumeButton />
      {winnerInfo}
      <Timer />
      <div className={styles.gamefield}>
        <div className={styles.top}>
          <h1>Baccarat</h1>
          <div className={styles.status}>{status}</div>
          <PlayerField />
          <BankerField />
        </div>
        <div className={styles.bottomField}>
          <BettingControls />
          <BottomInformation />
        </div>
      </div>
    </>
  );
});
