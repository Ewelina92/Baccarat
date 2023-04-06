import React from "react";
import { observer } from "mobx-react";
import { Card as CardType } from "../../types";
import "./Card.scss";
// import { useMainStore } from "../../hooks/useMainStore";

export type CardProps = {
  card: CardType;
};
export const Card = observer(({ card }: CardProps): JSX.Element => {
  // const { game } = useMainStore();
  const cardCSS = `front${card.face}${card.suit}`;

  return (
    <div className={card.flipped ? "flip-container flip" : "flip-container"}>
      <div className="flipper">
        <div className="front">
          <div className={`${cardCSS} size`} />
        </div>
        <div className="back" />
      </div>
    </div>
  );
});
