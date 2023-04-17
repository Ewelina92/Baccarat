import React from "react";
import { observer } from "mobx-react";
import { BetOnOptions, BettingChip, BettingChipsValues } from "./BettingChip";

import styles from "./BettingChips.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";

const bettingChipValues: BettingChipsValues[] = [1, 5, 25, 50, 100];

export type BettingChipsProps = {
  // bettingChoice: BetOnOptions;
};

export const BettingChips = observer(() => {
  const { game, player } = useMainStore();

  const setBetValue = (value: number) => {
    game.setChosenBetValue(value);
  };

  return (
    <div className={styles.chips}>
      {bettingChipValues.map((value) => (
        <BettingChip
          key={value}
          value={value}
          isHidden={player.playerMoney < value}
          isDisabled={game.gameStage !== GameStage.InitialBet}
          placeBet={setBetValue}
        />
      ))}
    </div>
  );
});
