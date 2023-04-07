import React from "react";
import { observer } from "mobx-react";
import { Portal } from "./Portal";
import styles from "./StartOverlay.module.scss";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";

export const StartOverlay = observer(() => {
  const { game, player } = useMainStore();
  const [name, setName] = React.useState("");
  const [money, setMoney] = React.useState(0);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setMoney(+event.target.value);
  };

  const startGame = () => {
    game.nextRound();
    player.setPlayerName(name);
    player.addPlayerMoney(money);
  };

  return (
    <Portal>
      <div className={styles.overlay}>
        <h1>Welcome to Baccarat</h1>
        <form>
          <div>
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
          <div>
            <label htmlFor="money">
              How much money are you bringing?
              <input
                id="money"
                type="number"
                min={0}
                max={10000}
                onChange={handleMoney}
                placeholder="0"
              />
            </label>
          </div>
          {/* <button className={styles.btn}>Start New Game</button> */}
          <button
            type="button"
            className={`${styles.glow} ${styles.btn}`}
            onClick={startGame}
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
