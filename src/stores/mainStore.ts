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
import { WinnerOptions } from "../types";

// bet,
// player + bank 2 cards each
// -> check who won OR check for third cards
// -> winner
// continue? play again? or end?s

const MULTIPLIER_PLAYER_WIN = 2;
const MULTIPLIER_TIE_WIN = 6;
const MULTIPLIER_BANKER_WIN = 1.95;

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
    // this.game.setGameStage(GameStage.InitialCards);
    this.game.setGameStage(GameStage.InitialBet);
    this.game.resetBets();
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
    if (winner === WinnerOptions.Player) {
      this.player.addPlayerMoney(this.game.playerBet * MULTIPLIER_PLAYER_WIN);
    }
    if (winner === WinnerOptions.Tie) {
      this.player.addPlayerMoney(this.game.tieBet * MULTIPLIER_TIE_WIN);
    }
    if (winner === WinnerOptions.Banker) {
      this.player.addPlayerMoney(this.game.bankerBet * MULTIPLIER_BANKER_WIN);
    }
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.disposeReaction = reaction(
      () => this.game.gameStage,
      () => {
        runInAction(() => {
          switch (this.game.gameStage) {
            case GameStage.InitialBet:
              break;
            case GameStage.InitialCards:
              this.baccarat.givePlayerACard();
              this.baccarat.givePlayerACard();
              this.baccarat.giveBankerACard();
              this.baccarat.giveBankerACard();
              // FLIP CARDS
              this.baccarat.playerCards.forEach((card) => {
                // eslint-disable-next-line no-param-reassign
                card.flipped = true;
              });
              this.baccarat.bankerCards.forEach((card) => {
                // eslint-disable-next-line no-param-reassign
                card.flipped = true;
              });
              setTimeout(() => {
                this.game.setGameStage(GameStage.CheckForThirdCard);
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
                setTimeout(() => {
                  if (this.player.playerMoney < 1) {
                    this.endGameReset();
                    this.game.setGameStage(GameStage.InitialBet);
                  } else {
                    this.betweenRoundsReset();
                    this.game.setGameStage(GameStage.InitialBet);
                  }
                }, 4000);
              }
              // otherwise
              else {
                // player needs third card?
                if (needThirdCardPlayerRule(this.baccarat.playerPoints)) {
                  this.baccarat.givePlayerACard();
                  const timer = setTimeout(() => {
                    if (this.baccarat.playerCards[2]) {
                      this.baccarat.playerCards[2].flipped = true;
                    }
                    clearTimeout(timer);
                  }, 500);
                  if (
                    // banker according to banker rule
                    needThirdCardBankersRule(
                      this.baccarat.bankerPoints,
                      this.baccarat.playerCards[2].face
                    )
                  ) {
                    this.baccarat.giveBankerACard();
                    const timer2 = setTimeout(() => {
                      if (this.baccarat.bankerCards[2]) {
                        this.baccarat.bankerCards[2].flipped = true;
                      }
                      clearTimeout(timer2);
                    }, 500);
                  }
                } else if (
                  needThirdCardPlayerRule(this.baccarat.bankerPoints)
                ) {
                  // player didn't get third card
                  // banker third card according to players rule
                  this.baccarat.giveBankerACard();
                  const timer = setTimeout(() => {
                    if (this.baccarat.bankerCards[2]) {
                      this.baccarat.bankerCards[2].flipped = true;
                    }
                    clearTimeout(timer);
                  }, 500);
                }
                // check for winner
                setTimeout(() => {
                  this.setWinner();
                }, 2000);
                // this.setWinner();
                setTimeout(() => {
                  if (this.player.playerMoney < 1) {
                    this.endGameReset();
                    this.game.setGameStage(GameStage.InitialBet);
                  } else {
                    this.betweenRoundsReset();
                    this.game.setGameStage(GameStage.InitialBet);
                  }
                }, 4000);
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
