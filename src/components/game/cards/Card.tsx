import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import "./Card.scss";
import { Card as CardType } from "../../../types";

export type CardProps = {
  card: CardType;
};
export const Card = observer(({ card }: CardProps): JSX.Element => {
  const cardCSS = `front${card.face}${card.suit}`;

  return (
    <div className={cn("flip-container", { flip: card.flipped })}>
      <div className="flipper">
        <div className="front">
          <div className={cn(cardCSS, "size")} />
        </div>
        <div className="back" />
      </div>
    </div>
  );
});
