import React from "react";
import styles from "./BettingChip.module.scss";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;
export type BetOnOptions = "player" | "tie" | "bank";

export type BettingChipProps = {
  value: BettingChipsValues;
  isHidden: boolean;
  isDisabled: boolean;
  placeBet: (value: number) => void;
};

export const BettingChip = ({
  value,
  isHidden,
  isDisabled,
  placeBet
}: BettingChipProps) => {
  const handleOnDragStart = () => {
    placeBet(value);
  };

  return (
    <button
      className={styles.chip}
      type="button"
      value={value}
      hidden={isHidden}
      disabled={isDisabled}
      draggable={!isDisabled}
      onDragStart={handleOnDragStart}
    >
      <span className={styles.inside}>{value}</span>
    </button>
  );
};
