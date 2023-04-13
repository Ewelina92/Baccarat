import { makeAutoObservable } from "mobx";
import { Card } from "../types";
import { getPoints, getShuffledShoe } from "../utils";

export class CardStore {
  cards: Card[] = [];

  playerCards: Card[] = [];

  bankerCards: Card[] = [];

  setCards() {
    this.cards = getShuffledShoe(6);
  }

  drawCard() {
    return this.cards.shift();
  }

  givePlayerACard() {
    const card = this.drawCard();
    if (card) {
      this.playerCards.push(card);
    }
  }

  giveBankerACard() {
    const card = this.drawCard();
    if (card) {
      this.bankerCards.push(card);
    }
  }

  get playerPoints(): number {
    return getPoints(this.playerCards);
  }

  get bankerPoints(): number {
    return getPoints(this.bankerCards);
  }

  resetPlayerCards() {
    this.playerCards = [];
  }

  resetBankerCards() {
    this.bankerCards = [];
  }

  flipPlayerCards() {
    this.playerCards.forEach((card) => {
      // eslint-disable-next-line no-param-reassign
      card.flipped = true;
    });
  }

  flipBankerCards() {
    this.bankerCards.forEach((card) => {
      // eslint-disable-next-line no-param-reassign
      card.flipped = true;
    });
  }

  nextRoundIsPossible(): boolean {
    if (this.cards.length > 5) {
      return true;
    }
    return false;
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setCards();
  }
}
