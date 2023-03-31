import React from "react";
import { useMainStore } from "../../hooks/useMainStore";
import { Card as CardType } from "../../types";
import "./Card.scss";

export type CardProps = {
  card: CardType;
};
export function Card({ card }: CardProps): JSX.Element {
  const [flipCard, setFlipCard] = React.useState(false);
  const cardCSS = `front${card.face}${card.suit}`;

  const timerId = setTimeout(() => {
    // card.flipped = true;
    setFlipCard(true);
  }, 500);

  return (
    <div className={flipCard ? "flip-container flip" : "flip-container"}>
      <div className="flipper">
        <div className="front">
          <div className={`${cardCSS} size`} />
        </div>
        <div className="back" />
      </div>
    </div>
  );
}
