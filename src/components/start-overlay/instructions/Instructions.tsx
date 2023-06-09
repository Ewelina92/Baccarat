import React from "react";

import styles from "./Instructions.module.scss";

export const Instructions = () => (
  <div className={styles.instructions}>
    <details>
      <summary>Instructions</summary>
      <h2>How to play</h2>
      <p>
        We are gonna play the &#34;Punto banco&#34; version of Baccarat with six
        card-decks.
      </p>
      <p>
        Place your bets by dragging a betting chip over the hand that you want
        to bet on, or by first clicking on the chip and thereafter on the hand
        that you want to bet on. By clicking the undo-button you undo your last
        bet, and by clicking the double-button you double all your bets.
      </p>
      <p>When you&#39;re done placing your bets, click deal.</p>
      <p>The round is now gonna play out.</p>
      <p>
        To play another round, place your bets and again click the deal-button.
      </p>
      <p>
        If you run out of money (or you run out of cards), the game will end. If
        you don&#39;t want to continue playing, just close the browser/tab.
      </p>

      <h2>Rules</h2>
      <p>
        If neither the player nor the banker is dealt a total of 8 or 9 in the
        first two cards (known as a &#34;natural&#34;) third cards are drawn
        accordingly with the player&#39;s rule and the banker&#39;s rule.
      </p>
      <p>
        If the player has an initial total of 5 or less, they draw a third card.
        If the player has an initial total of 6 or 7, they stand.
      </p>
      <p>
        If the player stood pat (i.e. has only two cards), the banker regards
        only their own hand and acts according the player&#39;s rule.
      </p>
      <p>
        If the player drew a third card, the banker acts according to the
        following more complex rules: If the banker total is 2 or less, they
        draw a third card regardless of what the player&#39;s third card is. If
        the banker total is 3, they draw a third card unless the player&#39;s
        third card is an 8. If the banker total is 4, they draw a third card if
        the player&#39;s third card is 2, 3, 4, 5, 6, or 7. If the banker total
        is 5, they draw a third card if the player&#39;s third card is 4, 5, 6,
        or 7. If the banker total is 6, they draw a third card if the
        player&#39;s third card is a 6 or 7. If the banker total is 7, they
        stand.
      </p>
    </details>
  </div>
);
