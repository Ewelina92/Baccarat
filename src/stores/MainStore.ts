import React from "react";
import {
  makeAutoObservable,
  runInAction,
  toJS,
  IReactionDisposer,
  reaction
} from "mobx";
import { Card } from "../types";
import {
  getShuffledShoe,
  getPoints,
  checkWinner,
  needThirdCardPlayerRule,
  needThirdCardBankersRule
} from "../utils";

// bet,
// player + bank 2 cards each
// -> check who won OR check for third cards
// -> winner
// continue? play again? or end?

export enum GameStage {
  Start,
  InitialBet,
  SecondBet,
  InitialCards,
  CheckForThirdCard,
  Continue,
  End
}

export class BaccaratStore {
  gameStage: GameStage = GameStage.Start;

  cards: Card[] = [];

  playerCards: Card[] = [];

  bankerCards: Card[] = [];

  playerName = "";

  gameRound = 1;

  playerMoney = 0;

  bet = 0;

  winner = "";

  disposeReaction: IReactionDisposer;

  flip = false;

  endGameReset() {
    this.setGameStage(GameStage.Start);
    this.setCards();
    this.resetPlayerCards();
    this.resetBankerCards();
    this.playerName = "";
    this.gameRound = 1;
    this.bet = 0;
    this.winner = "";
    this.playerMoney = 0;
  }

  betweenRoundsReset() {
    this.setGameStage(GameStage.InitialCards);
    this.resetPlayerCards();
    this.resetBankerCards();
    this.winner = "";
    this.nextRound();
  }

  get playerPoints(): number {
    return getPoints(this.playerCards);
  }

  get bankerPoints(): number {
    return getPoints(this.bankerCards);
  }

  setCurrentBet(bet: number) {
    this.bet += bet;
  }

  setNewBet(bet: number) {
    this.bet = bet;
  }

  nextRound() {
    this.gameRound += 1;
  }

  nextRoundIsPossible(): boolean {
    if (this.cards.length > 5) {
      return true;
    }
    return false;
  }

  drawCard() {
    // eslint-disable-next-line no-console
    console.log(toJS(this.cards[0]));
    // eslint-disable-next-line no-console
    console.log(this.cards.length);
    return this.cards.shift();
  }

  async givePlayerACard() {
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

  setCards() {
    this.cards = getShuffledShoe(6);
  }

  resetPlayerCards() {
    this.playerCards = [];
  }

  resetBankerCards() {
    this.bankerCards = [];
  }

  setGameStage(gameStage: GameStage) {
    this.gameStage = gameStage;
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  setWinner() {
    const winner = checkWinner(this.playerPoints, this.bankerPoints);
    this.winner = winner;
    if (winner === "player") {
      this.playerMoney += this.bet;
    }
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setCards();

    this.disposeReaction = reaction(
      () => this.gameStage,
      () => {
        runInAction(() => {
          switch (this.gameStage) {
            case GameStage.InitialCards:
              this.givePlayerACard();
              this.givePlayerACard();
              this.giveBankerACard();
              this.giveBankerACard();
              setTimeout(() => {
                this.setGameStage(GameStage.SecondBet);
                // this.setGameStage(GameStage.CheckForThirdCard);
                // console.log("GAMESTAGE TWO", this.gameStage);
              }, 2000);
              break;
            case GameStage.CheckForThirdCard:
              // console.log("CHECK FOR CARDS", this.gameStage);
              // if 8 or 9 points check winner
              if (
                this.playerPoints === 8 ||
                this.playerPoints === 9 ||
                this.bankerPoints === 8 ||
                this.bankerPoints === 9
              ) {
                setTimeout(() => {
                  this.setWinner();
                }, 2000);
                // this.setWinner();
                setTimeout(() => {
                  this.setGameStage(GameStage.Continue);
                }, 4000);
                // this.setGameStage(GameStage.Continue);
              }
              // otherwise
              else {
                // player needs third card?
                if (needThirdCardPlayerRule(this.playerPoints)) {
                  this.givePlayerACard();
                  if (
                    // banker according to banker rule
                    needThirdCardBankersRule(
                      this.bankerPoints,
                      this.playerCards[2].face
                    )
                  ) {
                    this.giveBankerACard();
                  }
                } else if (needThirdCardPlayerRule(this.bankerPoints)) {
                  // player didn't get third card
                  // banker third card according to players rule
                  this.giveBankerACard();
                }
                // check for winner
                setTimeout(() => {
                  this.setWinner();
                }, 2000);
                // this.setWinner();
                setTimeout(() => {
                  this.setGameStage(GameStage.Continue);
                }, 4000);
                // this.setGameStage(GameStage.Continue);
              }
              break;
            default:
              break;
          }
        });
      }
    );
  }
}

export const mainStore = new BaccaratStore();
export const MainStoreContext = React.createContext<BaccaratStore | null>(null);
