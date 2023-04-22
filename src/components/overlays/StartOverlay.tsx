import React from "react";
import { Portal } from "./Portal";
import { VolumeButton } from "../game-setup/VolumeButton";
import { Instructions } from "./Instructions";
import { StartForm } from "./StartForm";
import styles from "./StartOverlay.module.scss";

export const StartOverlay = () => (
  <Portal>
    <div className={styles.overlay}>
      <VolumeButton />
      <h1>Welcome to Baccarat</h1>
      <StartForm />
      <Instructions />
    </div>
  </Portal>
);
