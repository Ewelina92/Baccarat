import React from "react";
import { observer } from "mobx-react";
import { BettingField } from "./BettingField";
import { useMainStore } from "../../../hooks/useMainStore";
import styles from "./BettingFields.module.scss";

export const BettingFields = observer(() => {
  const { game, betOnPlayer, betOnTie, betOnBanker } = useMainStore();

  return (
    <div className={styles.bettingField}>
      <BettingField
        style={styles.player}
        betOn={betOnPlayer}
        bet={game.playerBet}
        name="PLAYER"
        odds="1:1"
      />
      <BettingField
        style={styles.tie}
        betOn={betOnTie}
        bet={game.tieBet}
        name="TIE"
        odds="5:1"
      />
      <BettingField
        style={styles.banker}
        betOn={betOnBanker}
        bet={game.bankerBet}
        name="BANKER"
        odds="0.95:1"
      />
    </div>
  );
});
