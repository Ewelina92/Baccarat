import React from "react";

import styles from "./BettingChip.module.scss";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;
export type BetOnOptions = "player" | "tie" | "bank";

export type BettingChipProps = {
  value: BettingChipsValues;
  isHidden: boolean;
  placeBet: (value: number) => void;
};

export const BettingChip = ({
  value,
  isHidden,
  placeBet
}: BettingChipProps) => {
  const handleOnClick = () => {
    placeBet(value);
  };

  return (
    <button
      className={styles.chip}
      type="button"
      value={value}
      onClick={handleOnClick}
      hidden={isHidden}
    >
      {value}
    </button>
  );
};
