/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";

import chipSound from "../../sounds/betting-chip-sound.mp3";

import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingField.module.scss";
import { playAudio } from "../../utils";

export const BettingField = observer(() => {
  const { game, betOnPlayer, betOnTie, betOnBanker, sound } = useMainStore();

  const chipAudio = useAudio(chipSound);

  const betOnThePlayer = () => {
    if (game.chosenBetValue > 0) {
      betOnPlayer(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };
  const betOnTheTie = () => {
    if (game.chosenBetValue > 0) {
      betOnTie(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };
  const betOnTheBank = () => {
    if (game.chosenBetValue > 0) {
      betOnBanker(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };

  function allowDrop(ev: SyntheticEvent) {
    ev.preventDefault();
  }

  return (
    <div className={styles.bettingField}>
      <div
        className={styles.player}
        onDragOver={allowDrop}
        onDrop={betOnThePlayer}
        onClick={betOnThePlayer}
      >
        <div className={styles.fieldInfo}>
          <p className={styles.name}>PLAYER</p>
          <p className={styles.stake}>1:1</p>
        </div>
        <p className={styles.bet}>&euro; {game.playerBet}</p>
      </div>
      <div
        className={styles.tie}
        onDragOver={allowDrop}
        onDrop={betOnTheTie}
        onClick={betOnTheTie}
      >
        <div className={styles.fieldInfo}>
          <p className={styles.name}>TIE</p>
          <p className={styles.stake}>5:1</p>
        </div>
        <p>&euro; {game.tieBet}</p>
      </div>
      <div
        className={styles.banker}
        onDragOver={allowDrop}
        onDrop={betOnTheBank}
        onClick={betOnTheBank}
      >
        <div className={styles.fieldInfo}>
          <p className={styles.name}>BANKER</p>
          <p className={styles.stake}>0.95:1</p>
        </div>
        <p>&euro; {game.bankerBet}</p>
      </div>
    </div>
  );
});
