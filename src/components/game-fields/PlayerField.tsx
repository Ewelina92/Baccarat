import React from "react";
import { observer } from "mobx-react";
import { Cards } from "../cards/Cards";
import { useMainStore } from "../../hooks/useMainStore";
import styles from "./PlayerField.module.scss";

export const PlayerField = observer(() => {
  const { baccarat } = useMainStore();

  return (
    <div className={styles.field}>
      <p>You have: {baccarat.playerPoints}</p>
      <Cards cards={baccarat.playerCards} revertDirection />
    </div>
  );
});
