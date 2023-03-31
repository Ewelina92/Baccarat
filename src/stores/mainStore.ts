import React from "react";
import {
  makeAutoObservable,
  runInAction,
  IReactionDisposer,
  reaction
} from "mobx";
import {
  checkWinner,
  needThirdCardPlayerRule,
  needThirdCardBankersRule
} from "../utils";
import { PlayerStore } from "./playerStore";
import { BaccaratStore } from "./baccaratStore";
import { GameStage, GameStore } from "./gameStore";

// bet,
// player + bank 2 cards each
// -> check who won OR check for third cards
// -> winner
// continue? play again? or end?s

export class MainStore {
  player: PlayerStore = new PlayerStore();

  baccarat: BaccaratStore = new BaccaratStore();

  game: GameStore = new GameStore();

  disposeReaction: IReactionDisposer;

  endGameReset() {
    this.game.resetGame();
    this.player.resetPlayer();
    this.baccarat.setCards();
    this.baccarat.resetPlayerCards();
    this.baccarat.resetBankerCards();
  }

  betweenRoundsReset() {
    this.game.setGameStage(GameStage.InitialCards);
    this.baccarat.resetPlayerCards();
    this.baccarat.resetBankerCards();
    this.game.resetWinner();
    this.game.nextRound();
  }

  setWinner() {
    const winner = checkWinner(
      this.baccarat.playerPoints,
      this.baccarat.bankerPoints
    );
    this.game.setWinner(winner);
    if (winner === "player") {
      this.player.addPlayerMoney(this.game.bet);
    }
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.disposeReaction = reaction(
      () => this.game.gameStage,
      () => {
        runInAction(() => {
          switch (this.game.gameStage) {
            case GameStage.InitialCards:
              this.baccarat.givePlayerACard();
              this.baccarat.givePlayerACard();
              this.baccarat.giveBankerACard();
              this.baccarat.giveBankerACard();
              setTimeout(() => {
                this.game.setGameStage(GameStage.SecondBet);
              }, 2000);
              break;
            case GameStage.CheckForThirdCard:
              // if 8 or 9 points check winner
              if (
                this.baccarat.playerPoints === 8 ||
                this.baccarat.playerPoints === 9 ||
                this.baccarat.bankerPoints === 8 ||
                this.baccarat.bankerPoints === 9
              ) {
                setTimeout(() => {
                  this.setWinner();
                }, 2000);
                // this.setWinner();
                setTimeout(() => {
                  this.game.setGameStage(GameStage.Continue);
                }, 4000);
                // this.setGameStage(GameStage.Continue);
              }
              // otherwise
              else {
                // player needs third card?
                if (needThirdCardPlayerRule(this.baccarat.playerPoints)) {
                  this.baccarat.givePlayerACard();
                  if (
                    // banker according to banker rule
                    needThirdCardBankersRule(
                      this.baccarat.bankerPoints,
                      this.baccarat.playerCards[2].face
                    )
                  ) {
                    this.baccarat.giveBankerACard();
                  }
                } else if (
                  needThirdCardPlayerRule(this.baccarat.bankerPoints)
                ) {
                  // player didn't get third card
                  // banker third card according to players rule
                  this.baccarat.giveBankerACard();
                }
                // check for winner
                setTimeout(() => {
                  this.setWinner();
                }, 2000);
                // this.setWinner();
                setTimeout(() => {
                  this.game.setGameStage(GameStage.Continue);
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

export const mainStore = new MainStore();
export const MainStoreContext = React.createContext<MainStore | null>(null);
