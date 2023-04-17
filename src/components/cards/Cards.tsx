import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { Card as CardType, CardSuit } from "../../types";
import { Card } from "./Card";
import { GameStage } from "../../stores/gameStore";
import { useMainStore } from "../../hooks/useMainStore";

import styles from "./Cards.module.scss";

export type CardsProps = {
  cards: CardType[];
  revertDirection?: boolean;
};

export const Cards = observer(({ revertDirection, cards }: CardsProps) => {
  const { game } = useMainStore();
  const [firstCard, secondCard, thirdCard] = cards;

  const fakeCard = {
    face: "fake",
    suit: CardSuit.Clover,
    value: 0,
    flipped: false
  };

  return (
    <div className={cn(styles.cards, { [styles.reverse]: revertDirection })}>
      <Card
        card={game.gameStage === GameStage.InitialBet ? fakeCard : firstCard}
      />
      <Card
        card={game.gameStage === GameStage.InitialBet ? fakeCard : secondCard}
      />
      {thirdCard && <Card card={thirdCard} />}
    </div>
  );
});
