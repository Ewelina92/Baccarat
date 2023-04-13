import React from "react";
import { observer } from "mobx-react";
import { BetOnOptions, BettingChip, BettingChipsValues } from "./BettingChip";
import sound from "./betting-chip-sound.mp3";
import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingChips.module.scss";
import { useMainStore } from "../../hooks/useMainStore";

const bettingChipValues: BettingChipsValues[] = [1, 5, 25, 50, 100];

export type BettingChipsProps = {
  bettingChoice: BetOnOptions;
};

export const BettingChips = observer(({ bettingChoice }: BettingChipsProps) => {
  const { player, betOnPlayer, betOnTie, betOnBanker } = useMainStore();
  const audio = useAudio(sound);

  const addToBet = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement;

    if (+value > player.playerMoney) {
      return;
    }

    switch (bettingChoice) {
      case "player":
        betOnPlayer(+value);
        break;
      case "tie":
        betOnTie(+value);
        break;
      case "bank":
        betOnBanker(+value);
        break;
      default:
        return;
    }
    audio.play();
  };

  return (
    <div className={styles.chips}>
      {bettingChipValues.map((value) => (
        <BettingChip
          key={value}
          value={value}
          isHidden={player.playerMoney < +value}
          onClick={addToBet}
        />
      ))}
    </div>
  );
});
