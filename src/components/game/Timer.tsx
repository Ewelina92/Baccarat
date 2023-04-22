import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { formatTime } from "../../utils";
import styles from "./Timer.module.scss";

export const Timer = observer(() => {
  const { game } = useMainStore();

  const timeAsString = formatTime(game.time);

  return <p className={styles.timer}>{timeAsString}</p>;
});
