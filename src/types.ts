export enum HandOptions {
  Player = "Player",
  Tie = "Tie",
  Banker = "Bank"
}

export enum CardSuit {
  Clover = "C",
  Diamond = "D",
  Heart = "H",
  Spade = "S"
}

export interface Card {
  face: string;
  suit: CardSuit;
  value: number;
  flipped: boolean;
}

export const suits = [
  CardSuit.Clover,
  CardSuit.Diamond,
  CardSuit.Heart,
  CardSuit.Spade
];

export const cardFaces = {
  A: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 0,
  J: 0,
  Q: 0,
  K: 0
};
