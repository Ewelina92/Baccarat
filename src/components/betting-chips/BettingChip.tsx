import React from "react";
import { observer } from "mobx-react";

import styles from "./BettingChip.module.scss";
import { useMainStore } from "../../hooks/useMainStore";

export type BettingChipProps = {
  value: string;
  color: string;
};

export const BettingChip = observer((props: BettingChipProps) => {
  const { value, color } = props;
  const { game } = useMainStore();

  const addToBet = () => {
    game.setCurrentBet(+value);
  };

  return (
    <button
      className={styles.chip}
      style={{ borderColor: `${color}` }}
      type="button"
      value={value}
      onClick={addToBet}
    >
      {value}
    </button>
  );
});
