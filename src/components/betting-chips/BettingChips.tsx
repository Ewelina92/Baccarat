import React from "react";
import { observer } from "mobx-react";
import { BetOnOptions, BettingChip, BettingChipsValues } from "./BettingChip";

import styles from "./BettingChips.module.scss";

const bettingChipValues: BettingChipsValues[] = [1, 5, 25, 50, 100];

export type BettingChipsProps = {
  bettingChoice: BetOnOptions;
};

export const BettingChips = observer(({ bettingChoice }: BettingChipsProps) => (
  <div className={styles.chips}>
    {bettingChipValues.map((value) => (
      <BettingChip key={value} value={value} betOn={bettingChoice} />
    ))}
  </div>
));
