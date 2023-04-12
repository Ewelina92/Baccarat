import React from "react";
import { observer } from "mobx-react";

import styles from "./BettingChip.module.scss";
import { useMainStore } from "../../hooks/useMainStore";

export type BettingChipsValues = 1 | 5 | 25 | 50 | 100;
export type BetOnOptions = "player" | "tie" | "bank";

export type BettingChipProps = {
  value: BettingChipsValues;
  betOn: BetOnOptions;
};

export const BettingChip = observer((props: BettingChipProps) => {
  const { value, betOn } = props;
  const { game, player } = useMainStore();

  const addToBet = () => {
    if (value > player.playerMoney) {
      return;
    }

    switch (betOn) {
      case "player":
        game.addToPlayerBet(value);
        break;
      case "tie":
        game.addToTieBet(value);
        break;
      case "bank":
        game.addToBankerBet(value);
        break;
      default:
        break;
    }
    player.removePlayerMoney(value);
  };

  return (
    <button
      className={styles.chip}
      type="button"
      value={value}
      onClick={addToBet}
      disabled={value > player.playerMoney}
    >
      {value}
    </button>
  );
});
