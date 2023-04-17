import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./StartOverlay.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import sound from "../betting-chips/place-bets-please.mp3";
import { useAudio } from "../../hooks/useAudio";

export const StartOverlay = observer(() => {
  const { game, player, createSnapshot, soundVolume, toggleSound } =
    useMainStore();
  const [name, setName] = React.useState("");
  const [money, setMoney] = React.useState(0);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const audio = useAudio(sound, { volume: soundVolume });

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim());
  };

  const handleMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(event.target.valueAsNumber);
  };

  const startGame = () => {
    if (!!name.length && money > 0) {
      game.nextRound();
      player.setInitialData(name, money);
      createSnapshot();
      audio.play();
    } else {
      setFormErrorMessage(
        "Please fill out your name and starting amount to begin."
      );
    }
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <button type="button" className={styles.sound} onClick={toggleSound}>
          {soundVolume === 1 ? (
            <span className="material-symbols-outlined">volume_up</span>
          ) : (
            <span className="material-symbols-outlined">volume_off</span>
          )}
        </button>
        <h1>Welcome to Baccarat</h1>
        <form>
          {formErrorMessage}
          <div className={styles.formentry}>
            <label htmlFor="player-name">
              What&#39;s your name?
              <input
                id="player-name"
                type="text"
                onChange={handleName}
                placeholder="Your name"
              />
            </label>
          </div>
          <div className={styles.formentry}>
            <label htmlFor="money">
              How much money are you bringing?
              <input
                id="money"
                type="number"
                min={0}
                max={10000}
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
          <h3>Rules</h3>
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
