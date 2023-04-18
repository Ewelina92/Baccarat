import { CardStore } from "./cardStore";
import { Card, CardSuit } from "../types";

const fakeCards: Card[] = [
  { face: "2", suit: CardSuit.Diamond, value: 2, flipped: false },
  { face: "9", suit: CardSuit.Clover, value: 9, flipped: false },
  { face: "jack", suit: CardSuit.Clover, value: 0, flipped: false },
  { face: "3", suit: CardSuit.Heart, value: 3, flipped: false },
  { face: "4", suit: CardSuit.Heart, value: 4, flipped: false }
];

describe("create a cardStore with default settings", () => {
  it("should return cardStore with initial settings", () => {
    const cardStore = new CardStore();

    expect(cardStore.cards).toHaveLength(288);
    expect(cardStore.playerCards).toHaveLength(0);
    expect(cardStore.bankerCards).toHaveLength(0);
  });
});

describe("cardStore methods should work", () => {
  it("should draw a card", () => {
    const cardStore = new CardStore();
    const drawnCard = cardStore.drawCard();

    expect(drawnCard).toHaveProperty("face");
    expect(drawnCard).toHaveProperty("suit");
    expect(drawnCard).toHaveProperty("value");
    expect(drawnCard).toHaveProperty("flipped");
  });

  it("should give player a card", () => {
    const cardStore = new CardStore();
    cardStore.givePlayerACard();

    expect(cardStore.playerCards).toHaveLength(1);
  });

  it("should give banker a card", () => {
    const cardStore = new CardStore();
    cardStore.giveBankerACard();

    expect(cardStore.bankerCards).toHaveLength(1);
  });

  it("should reset player cards", () => {
    const cardStore = new CardStore();
    cardStore.resetPlayerCards();

    expect(cardStore.playerCards).toHaveLength(0);
  });

  it("should reset banker cards", () => {
    const cardStore = new CardStore();
    cardStore.resetBankerCards();

    expect(cardStore.bankerCards).toHaveLength(0);
  });
});

describe("should count points correctly", () => {
  const cardStore = new CardStore();
  cardStore.playerCards.push(fakeCards[0]); // 2
  cardStore.playerCards.push(fakeCards[1]); // 9
  cardStore.bankerCards.push(fakeCards[2]); // 0
  cardStore.bankerCards.push(fakeCards[3]); // 3

  it("should count player's points correctly", () => {
    expect(cardStore.playerPoints).toEqual(1);
  });

  it("should count banker's points correctly", () => {
    expect(cardStore.bankerPoints).toEqual(3);
  });
});

describe("should flip cards correctly", () => {
  const cardStore = new CardStore();

  cardStore.playerCards.push(fakeCards[1]);
  cardStore.playerCards.push(fakeCards[0]);

  cardStore.bankerCards.push(fakeCards[3]);
  cardStore.bankerCards.push(fakeCards[2]);

  it("should flip player's cards", () => {
    expect(cardStore.playerCards[0].flipped).toEqual(false);
    expect(cardStore.playerCards[1].flipped).toEqual(false);

    cardStore.flipPlayerCards();

    expect(cardStore.playerCards[0].flipped).toEqual(true);
    expect(cardStore.playerCards[1].flipped).toEqual(true);
  });

  it("should flip bankers's cards", () => {
    expect(cardStore.bankerCards[0].flipped).toEqual(false);
    expect(cardStore.bankerCards[1].flipped).toEqual(false);

    cardStore.flipBankerCards();

    expect(cardStore.bankerCards[0].flipped).toEqual(true);
    expect(cardStore.bankerCards[1].flipped).toEqual(true);
  });

  it("should flip players's third card", () => {
    cardStore.playerCards.push(fakeCards[3]);
    expect(cardStore.playerCards[2].flipped).toEqual(false);
    cardStore.flipThirdPlayerCard();
    expect(cardStore.playerCards[2].flipped).toEqual(true);
  });

  it("should flip banker's third card", () => {
    cardStore.bankerCards.push(fakeCards[3]);
    expect(cardStore.bankerCards[2].flipped).toEqual(false);
    cardStore.flipThirdBankerCard();
    expect(cardStore.bankerCards[2].flipped).toEqual(true);
  });
});

describe("should judge if next round is possible correctly", () => {
  it("should return true", () => {
    const cardStore = new CardStore();

    expect(cardStore.nextRoundIsPossible()).toBeTruthy();
  });

  it("should return false", () => {
    const cardStore = new CardStore();
    cardStore.cards = fakeCards;

    expect(cardStore.nextRoundIsPossible()).toBeFalsy();
  });
});
