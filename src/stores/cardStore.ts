import { makeAutoObservable, toJS } from "mobx";
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
    // eslint-disable-next-line no-console
    console.log(toJS(this.cards[0]));
    // eslint-disable-next-line no-console
    console.log(this.cards.length);
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
