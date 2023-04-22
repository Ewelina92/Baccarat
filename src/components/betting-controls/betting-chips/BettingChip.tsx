import React from "react";
import cn from "classnames";
import styles from "./BettingChip.module.scss";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;

export type BettingChipProps = {
  value: BettingChipsValues;
  isHidden: boolean;
  isDisabled: boolean;
  isActive: boolean;
  setBetValue: (value: number) => void;
};

export const BettingChip = ({
  value,
  isHidden,
  isDisabled,
  isActive,
  setBetValue
}: BettingChipProps) => {
  const markAsChosen = () => {
    setBetValue(value);
  };

  return (
    <button
      className={cn(styles.chip, { [styles.active]: isActive })}
      type="button"
      value={value}
      hidden={isHidden}
      disabled={isDisabled}
      draggable={!isDisabled}
      onDragStart={markAsChosen}
      onClick={markAsChosen}
    >
      <span className={styles.inside}>{value}</span>
    </button>
  );
};
