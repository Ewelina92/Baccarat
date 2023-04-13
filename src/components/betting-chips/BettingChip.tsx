import React from "react";
import { observer } from "mobx-react";
import sound from "./betting-chip-sound.mp3";

import styles from "./BettingChip.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import { useAudio } from "../../hooks/useAudio";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;
export type BetOnOptions = "player" | "tie" | "bank";

export type BettingChipProps = {
  value: BettingChipsValues;
  betOn: BetOnOptions;
};

export const BettingChip = observer(({ value, betOn }: BettingChipProps) => {
  const { player, betOnPlayer, betOnTie, betOnBanker } = useMainStore();
  const audio = useAudio(sound);

  const addToBet = () => {
    if (value > player.playerMoney) {
      return;
    }

    switch (betOn) {
      case "player":
        betOnPlayer(value);
        break;
      case "tie":
        betOnTie(value);
        break;
      case "bank":
        betOnBanker(value);
        break;
      default:
        return;
    }
    audio.play();
  };

  return (
    <button
      className={styles.chip}
      type="button"
      value={value}
      onClick={addToBet}
      hidden={value > player.playerMoney}
    >
      {value}
    </button>
  );
});
