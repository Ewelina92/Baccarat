import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { useMainStore } from "../../../hooks/useMainStore";
import { useAudio } from "../../../hooks/useAudio";
import { playAudio } from "../../../utils";
import chipSound from "../../../sounds/betting-chip-sound.mp3";
import styles from "./BettingField.module.scss";

type BettingFieldProps = {
  style: string;
  betOn: (amount: number) => void;
  bet: number;
  name: string;
  odds: string;
};

export const BettingField = observer(
  ({ style, betOn, bet, name, odds }: BettingFieldProps) => {
    const { game, sound } = useMainStore();

    const chipAudio = useAudio(chipSound);

    const allowDrop = React.useCallback((event: SyntheticEvent) => {
      event.preventDefault();
    }, []);

    const toBetOn = React.useCallback(() => {
      if (game.chosenBetValue > 0) {
        betOn(game.chosenBetValue);
        playAudio(chipAudio, +sound.soundVolume);
      }
    }, [game.chosenBetValue, sound.soundVolume, chipAudio]);

    return (
      <div
        className={cn(styles.field, style)}
        onDragOver={allowDrop}
        onDrop={toBetOn}
        onClick={toBetOn}
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
      >
        <div className={styles.fieldInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.stake}>{odds}</p>
        </div>
        <p className={styles.bet}>&euro; {bet}</p>
      </div>
    );
  }
);
