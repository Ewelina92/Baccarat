import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { BettingControls } from "../betting-controls/BettingControls";
import { GameStage } from "../../stores/gameStore";
import { VolumeButton } from "./VolumeButton";
import { BottomInformation } from "./BottomInformation";
import { Timer } from "./Timer";
import { useMainStore } from "../../hooks/useMainStore";
import { useAudio } from "../../hooks/useAudio";
import { playAudio } from "../../utils";
import winSound from "../../sounds/win-sound.mp3";
import styles from "./Game.module.scss";
import { ParticipantField } from "./ParticipantField";

export const Game = observer(() => {
  const { game, baccarat, sound, didWin } = useMainStore();
  const winAudio = useAudio(winSound);

  useEffect(() => {
    if (didWin) {
      playAudio(winAudio, +sound.soundVolume);
    }
  }, [didWin]);

  const status = (
    <div className={styles.status}>
      <p>
        {game.gameStage === GameStage.InitialBet
          ? "Place your bets"
          : "Playing"}
      </p>
    </div>
  );

  const winnerInfo = game.winner && (
    <div className={styles.winnerContainer}>
      <span className={styles.winner}>{game.winner}</span>
    </div>
  );

  return (
    <>
      <VolumeButton />
      {winnerInfo}
      <Timer />
      <div className={styles.gamefield}>
        <div className={styles.top}>
          <h1>Baccarat</h1>
          {status}
          <ParticipantField
            prefix="You have"
            participant="player"
            points={baccarat.playerPoints}
            cards={baccarat.playerCards}
            revertDirection
          />
          <ParticipantField
            prefix="Bank has"
            participant="banker"
            points={baccarat.bankerPoints}
            cards={baccarat.bankerCards}
            revertDirection={false}
          />
        </div>
        <div className={styles.bottomField}>
          <BettingControls />
          <BottomInformation />
        </div>
      </div>
    </>
  );
});
