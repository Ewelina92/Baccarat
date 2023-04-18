import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import styles from "./VolumeButton.module.scss";

export const VolumeButton = observer(() => {
  const { soundVolume, toggleSound } = useMainStore();

  return (
    <button type="button" className={styles.sound} onClick={toggleSound}>
      {soundVolume === "1" ? (
        <span className="material-symbols-outlined">volume_up</span>
      ) : (
        <span className="material-symbols-outlined">volume_off</span>
      )}
    </button>
  );
});
