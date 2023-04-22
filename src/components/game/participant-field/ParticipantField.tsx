import React from "react";
import cn from "classnames";
import { Cards } from "../cards/Cards";
import styles from "./ParticipantField.module.scss";
import { Card } from "../../../types";

type ParticipantFieldProps = {
  prefix: string;
  participant: "player" | "banker";
  points: number;
  cards: Card[];
  revertDirection: boolean;
};

export const ParticipantField = ({
  prefix,
  participant,
  points,
  cards,
  revertDirection
}: ParticipantFieldProps) => (
  <div className={cn(styles.field, styles[participant])}>
    <p>
      {prefix}: {points}
    </p>
    <Cards cards={cards} revertDirection={revertDirection} />
  </div>
);
