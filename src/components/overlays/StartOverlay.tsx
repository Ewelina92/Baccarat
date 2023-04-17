import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./StartOverlay.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import startSound from "../../sounds/place-bets-please.mp3";
import { useAudio } from "../../hooks/useAudio";
import { VolumeButton } from "../game-setup/VolumeButton";

export const StartOverlay = observer(() => {
  const { game, player, createSnapshot, soundVolume } = useMainStore();
  const [money, setMoney] = React.useState(0);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const audio = useAudio(startSound, { volume: +soundVolume });

  const handleMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(event.target.valueAsNumber);
  };

  const startGame = () => {
    if (money > 0 && money <= 1000) {
      game.nextRound();
      player.setInitialMoney(money);
      createSnapshot();
      audio.play();
    } else {
      setFormErrorMessage("Please add starting amount to begin.");
    }
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <VolumeButton />
        <h1>Welcome to Baccarat</h1>
        <form>
          {formErrorMessage}
          <div className={styles.formentry}>
            <label htmlFor="money">
              Starting balance:{" "}
              <span className={styles.balance}>(&euro;1-1000)</span>
              <input
                id="money"
                type="number"
                min={0}
                max={1000}
                onChange={handleMoney}
                placeholder="&euro; 0"
              />
            </label>
          </div>
          <button type="button" onClick={startGame}>
            Start New Game
          </button>
        </form>
        <div className={styles.rules}>
          <h3>How to play</h3>
          <p>
            We are gonna play the &#34;Punto banco&#34; version of Baccarat with
            six card-decks.
          </p>
          <p>
            If neither the player nor the banker is dealt a total of 8 or 9 in
            the first two cards (known as a &#34;natural&#34;) third cards are
            drawn accordingly with the player&#39;s rule and the banker&#39;s
            rule.
          </p>
          <p>
            If the player has an initial total of 5 or less, they draw a third
            card. If the player has an initial total of 6 or 7, they stand.
          </p>
          <p>
            If the player stood pat (i.e. has only two cards), the banker
            regards only their own hand and acts according the player&#39;s
            rule.
          </p>
          <p>
            If the player drew a third card, the banker acts according to the
            following more complex rules: If the banker total is 2 or less, they
            draw a third card regardless of what the player&#39;s third card is.
            If the banker total is 3, they draw a third card unless the
            player&#39;s third card is an 8. If the banker total is 4, they draw
            a third card if the player&#39;s third card is 2, 3, 4, 5, 6, or 7.
            If the banker total is 5, they draw a third card if the player&#39;s
            third card is 4, 5, 6, or 7. If the banker total is 6, they draw a
            third card if the player&#39;s third card is a 6 or 7. If the banker
            total is 7, they stand.
          </p>
        </div>
      </div>
    </Portal>
  );
});
