import { Card, CardSuit } from "./types";
import {
  createCardDeck48Cards,
  createShoe,
  getPoints,
  checkWinner,
  needThirdCardPlayerRule,
  needThirdCardBankersRule
} from "./utils";

const cardDeckForTests1: Card[] = [
  { face: "2", suit: CardSuit.Diamond, value: 2, flipped: false },
  { face: "9", suit: CardSuit.Clover, value: 9, flipped: false },
  { face: "ace", suit: CardSuit.Heart, value: 1, flipped: false }
];

const cardDeckForTests2: Card[] = [
  { face: "3", suit: CardSuit.Diamond, value: 3, flipped: false },
  { face: "jack", suit: CardSuit.Clover, value: 0, flipped: false },
  { face: "ace", suit: CardSuit.Heart, value: 1, flipped: false }
];

describe("create a card deck with 48 cards", () => {
  it("should return a deck of 48 cards", () => {
    const cardDeck = createCardDeck48Cards();

    expect(cardDeck).toHaveLength(48);
  });
});

describe("create a shoe with correct amount of given type of card deck", () => {
  it("should return a deck of 9 cards", () => {
    const shoe = createShoe(3, cardDeckForTests1);

    expect(shoe).toHaveLength(9);
  });

  it("should return a deck of 18 cards", () => {
    const shoe = createShoe(6, cardDeckForTests1);

    expect(shoe).toHaveLength(18);
  });
});

describe("calculate points correctly", () => {
  it("should return 2 points", () => {
    const points = getPoints(cardDeckForTests1);

    expect(points).toEqual(2);
  });

  it("should return 4 points", () => {
    const points = getPoints(cardDeckForTests2);

    expect(points).toEqual(4);
  });
});

describe("judge winner correctly", () => {
  it("should return player as winner", () => {
    const playerPoints = 8;
    const bankPoints = 5;
    const winner = checkWinner(playerPoints, bankPoints);

    expect(winner).toEqual("player");
  });

  it("should return bank as winner", () => {
    const playerPoints = 0;
    const bankPoints = 5;
    const winner = checkWinner(playerPoints, bankPoints);

    expect(winner).toEqual("bank");
  });

  it("should detect a tie and return tie", () => {
    const playerPoints = 1;
    const bankPoints = 1;
    const winner = checkWinner(playerPoints, bankPoints);

    expect(winner).toEqual("tie");
  });
});

describe("correctly determine if a third card is needed according to player's rule", () => {
  it("should return true", () => {
    let needThirdCard = needThirdCardPlayerRule(5);
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardPlayerRule(0);
    expect(needThirdCard).toEqual(true);
  });

  it("should return false", () => {
    const needThirdCard = needThirdCardPlayerRule(6);
    expect(needThirdCard).toEqual(false);
  });
});

describe("correctly determine if a third card is needed according to banker's rule", () => {
  it("should return true", () => {
    let needThirdCard = needThirdCardBankersRule(0, "ace");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(1, "ace");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(2, "ace");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(3, "ace");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(4, "7");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(5, "7");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(6, "6");
    expect(needThirdCard).toEqual(true);

    needThirdCard = needThirdCardBankersRule(7, "6");
    expect(needThirdCard).not.toEqual(true);
  });

  it("should return false", () => {
    let needThirdCard = needThirdCardBankersRule(3, "8");
    expect(needThirdCard).toEqual(false);

    needThirdCard = needThirdCardBankersRule(4, "ace");
    expect(needThirdCard).toEqual(false);

    needThirdCard = needThirdCardBankersRule(5, "2");
    expect(needThirdCard).toEqual(false);

    needThirdCard = needThirdCardBankersRule(6, "8");
    expect(needThirdCard).toEqual(false);

    needThirdCard = needThirdCardBankersRule(7, "6");
    expect(needThirdCard).toEqual(false);
  });
});
