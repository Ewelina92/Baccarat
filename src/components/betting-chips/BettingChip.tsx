import React from "react";

import styles from "./BettingChip.module.scss";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;
export type BetOnOptions = "player" | "tie" | "bank";

export type BettingChipProps = {
  value: BettingChipsValues;
  isHidden: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BettingChip = ({ value, isHidden, onClick }: BettingChipProps) => (
  <button
    className={styles.chip}
    type="button"
    value={value}
    onClick={onClick}
    hidden={isHidden}
  >
    {value}
  </button>
);
