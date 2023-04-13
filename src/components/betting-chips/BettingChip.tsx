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
  const { game, player } = useMainStore();
  const audio = useAudio(sound);

  const addToBet = () => {
    if (value > player.playerMoney) {
      return;
    }

    switch (betOn) {
      case "player":
        game.addToPlayerBet(value);
        break;
      case "tie":
        game.addToTieBet(value);
        break;
      case "bank":
        game.addToBankerBet(value);
        break;
      default:
        return;
    }
    audio.play();
    player.removePlayerMoney(value);
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
