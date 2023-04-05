import React from "react";
import { observer } from "mobx-react";

import styles from "./BettingChip.module.scss";
import { useMainStore } from "../../hooks/useMainStore";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;

export type BettingChipProps = {
  value: BettingChipsValues;
};

export const BettingChip = observer((props: BettingChipProps) => {
  const { value } = props;
  const { game } = useMainStore();

  const addToBet = () => {
    game.setCurrentBet(value);
  };

  return (
    <button
      className={styles.chip}
      type="button"
      value={value}
      onClick={addToBet}
    >
      {value}
    </button>
  );
});
