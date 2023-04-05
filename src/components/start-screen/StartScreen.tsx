import React from "react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import styles from "./StartMenu.module.scss";

export const StartScreen = () => {
  const [name, setName] = React.useState("");
  const [bet, setBet] = React.useState(0);
  const mainStore = useMainStore();
  const { player, game } = mainStore;

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBet(+event.target.value);
  };

  const handleStartGame = () => {
    game.setGameStage(GameStage.InitialCards);
    player.setPlayerName(name);
    // game.setCurrentBet(bet);
  };

  return (
    <div className={styles.menu}>
      <h1>Welcome to Baccarat</h1>
      <form>
        <label htmlFor="player-name">
          What&#39;s your name?
          <input
            id="player-name"
            type="text"
            onChange={handleName}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="bet">
          What&#39;s your initial bet?
          <input
            id="bet"
            type="number"
            min={0}
            onChange={handleBet}
            placeholder="0"
          />
        </label>
        {/* <button className={styles.btn}>Start New Game</button> */}
        <button
          type="button"
          className={`${styles.glow} ${styles.btn}`}
          onClick={handleStartGame}
        >
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
          If neither the player nor the banker is dealt a total of 8 or 9 in the
          first two cards (known as a &#34;natural&#34;) third cards are drawn
          accordingly with the player&#39;s rule and the banker&#39;s rule.
        </p>
        <p>
          If the player has an initial total of 5 or less, they draw a third
          card. If the player has an initial total of 6 or 7, they stand.
        </p>
        <p>
          If the player stood pat (i.e. has only two cards), the banker regards
          only their own hand and acts according the player&#39;s rule.
        </p>
        <p>
          If the player drew a third card, the banker acts according to the
          following more complex rules: If the banker total is 2 or less, they
          draw a third card regardless of what the player&#39;s third card is.
          If the banker total is 3, they draw a third card unless the
          player&#39;s third card is an 8. If the banker total is 4, they draw a
          third card if the player&#39;s third card is 2, 3, 4, 5, 6, or 7. If
          the banker total is 5, they draw a third card if the player&#39;s
          third card is 4, 5, 6, or 7. If the banker total is 6, they draw a
          third card if the player&#39;s third card is a 6 or 7. If the banker
          total is 7, they stand.
        </p>
      </div>
    </div>
  );
};
