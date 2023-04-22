import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import styles from "./Timer.module.scss";

export const Timer = observer(() => {
  const { game } = useMainStore();

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;

    const hoursAsString = hours.toString().padStart(2, "0");
    const minutesAsString = minutes.toString().padStart(2, "0");
    const secondsAsString = seconds.toString().padStart(2, "0");

    return `${hoursAsString}:${minutesAsString}:${secondsAsString}`;
  };

  const timeAsString = formatTime(game.time);

  return <p className={styles.timer}>{timeAsString}</p>;
});
