import React from "react";
import { Portal } from "./Portal";
import { VolumeButton } from "../volume-button/VolumeButton";
import { Instructions } from "./instructions/Instructions";
import { StartForm } from "./start-form/StartForm";
import styles from "./StartOverlay.module.scss";
import { Chat } from "./chat/Chat";

export const StartOverlay = () => (
  <Portal>
    <div className={styles.overlay}>
      <VolumeButton />
      <h1>Welcome to Baccarat</h1>
      <StartForm />
      <Instructions />
      <Chat />
    </div>
  </Portal>
);
