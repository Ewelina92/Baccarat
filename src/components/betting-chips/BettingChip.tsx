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
    switch (betOn) {
      case "player":
        if (value <= player.playerMoney) {
          game.addToPlayerBet(value);
          player.removePlayerMoney(value);
        }
        break;
      case "tie":
        if (value <= player.playerMoney) {
          game.addToTieBet(value);
          player.removePlayerMoney(value);
        }
        break;
      case "bank":
        if (value <= player.playerMoney) {
          game.addToBankerBet(value);
          player.removePlayerMoney(value);
        }
        break;
      default:
        break;
    }
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
