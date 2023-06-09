import React from "react";
import { observer } from "mobx-react";
import { BettingChip, BettingChipsValues } from "./BettingChip";
import { GameStage } from "../../../../stores/gameStore";
import { useMainStore } from "../../../../hooks/useMainStore";
import styles from "./BettingChips.module.scss";

const bettingChipValues: BettingChipsValues[] = [1, 5, 25, 50, 100];

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
          isActive={game.chosenBetValue === value}
          setBetValue={setBetValue}
        />
      ))}
    </div>
  );
});
