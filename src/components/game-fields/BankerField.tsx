import React from "react";
import { observer } from "mobx-react";
import { Cards } from "../cards/Cards";
import { useMainStore } from "../../hooks/useMainStore";
import styles from "./BankerField.module.scss";

export const BankerField = observer(() => {
  const { baccarat } = useMainStore();

  return (
    <div className={styles.field}>
      <p>Banker has: {baccarat.bankerPoints}</p>
      <Cards cards={baccarat.bankerCards} revertDirection={false} />
    </div>
  );
});
