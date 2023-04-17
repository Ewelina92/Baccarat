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
import { CardStore } from "./cardStore";
import { GameStage, GameStore } from "./gameStore";
import { WinnerOptions } from "../types";
import { Snapshot } from "./snapshotStore";

const MULTIPLIER_PLAYER_WIN = 2;
const MULTIPLIER_TIE_WIN = 6;
const MULTIPLIER_BANKER_WIN = 1.95;

function delay(fn: () => void, time: number) {
  const timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, time);
}

export class MainStore {
  player: PlayerStore = new PlayerStore();

  baccarat: CardStore = new CardStore();

  game: GameStore = new GameStore();

  disposeReaction: IReactionDisposer;

  snapshots: Snapshot[] = [];

  soundVolume = 1;

  toggleSound() {
    if (this.soundVolume === 1) {
      this.soundVolume = 0;
    } else {
      this.soundVolume = 1;
    }
  }

  betOnPlayer(amount: number) {
    this.game.addToPlayerBet(amount);
    this.player.removePlayerMoney(amount);
    this.game.setChosenBetValue(0);
    this.createSnapshot();
  }

  betOnTie(amount: number) {
    this.game.addToTieBet(amount);
    this.player.removePlayerMoney(amount);
    this.game.setChosenBetValue(0);
    this.createSnapshot();
  }

  betOnBanker(amount: number) {
    this.game.addToBankerBet(amount);
    this.player.removePlayerMoney(amount);
    this.game.setChosenBetValue(0);
    this.createSnapshot();
  }

  doubleBets() {
    if (this.player.playerMoney >= this.game.totalBet) {
      this.player.removePlayerMoney(this.game.totalBet);
      this.game.doubleAllBets();
      this.createSnapshot();
    }
  }

  endGameReset() {
    this.game.fullReset();
    this.player.resetPlayer();
    this.baccarat.setCards();
    this.baccarat.resetPlayerCards();
    this.baccarat.resetBankerCards();
    this.snapshots = [];
  }

  betweenRoundsReset() {
    this.game.betweenRoundsReset();
    this.baccarat.resetPlayerCards();
    this.baccarat.resetBankerCards();
    this.snapshots = [];
    this.createSnapshot();
  }

  setWinner() {
    const winner = checkWinner(
      this.baccarat.playerPoints,
      this.baccarat.bankerPoints
    );
    this.game.setWinner(winner);
    switch (winner) {
      case WinnerOptions.Player:
        this.player.addPlayerMoney(this.game.playerBet * MULTIPLIER_PLAYER_WIN);
        break;
      case WinnerOptions.Tie:
        this.player.addPlayerMoney(this.game.tieBet * MULTIPLIER_TIE_WIN);
        break;
      case WinnerOptions.Banker:
        this.player.addPlayerMoney(this.game.bankerBet * MULTIPLIER_BANKER_WIN);
        break;
      default:
        break;
    }
  }

  createSnapshot() {
    const snapshot = new Snapshot(this.game, this.player);
    this.snapshots.push(snapshot);
  }

  undoLastBet() {
    if (this.snapshots.length > 1) {
      const snapshotToRestore = this.snapshots[this.snapshots.length - 2];
      snapshotToRestore?.undo();
      this.snapshots.pop();
    }
  }

  handleInitialCardsStage() {
    this.baccarat.givePlayerACard();
    this.baccarat.givePlayerACard();
    this.baccarat.giveBankerACard();
    this.baccarat.giveBankerACard();

    this.baccarat.flipPlayerCards();
    this.baccarat.flipBankerCards();

    delay(() => {
      this.game.setGameStage(GameStage.CheckForThirdCard);
    }, 2000);
  }

  handleGameRoundEnd() {
    delay(() => {
      this.setWinner();
    }, 2000);
    delay(() => {
      if (this.player.playerMoney < 1 || !this.baccarat.nextRoundIsPossible) {
        this.endGameReset();
      } else {
        this.betweenRoundsReset();
      }
      this.game.setGameStage(GameStage.InitialBet);
    }, 6000);
  }

  handleThirdCard(receiver: "player" | "banker") {
    if (receiver === "player") {
      this.baccarat.givePlayerACard();
      delay(() => {
        if (this.baccarat.playerCards[2]) {
          this.baccarat.flipThirdPlayerCard();
        }
      }, 500);
    }

    if (receiver === "banker") {
      this.baccarat.giveBankerACard();
      delay(() => {
        if (this.baccarat.bankerCards[2]) {
          this.baccarat.flipThirdBankerCard();
        }
      }, 500);
    }
  }

  handleThirdCardStage() {
    // if 8 or 9 points, end of round
    if (this.baccarat.playerPoints >= 8 || this.baccarat.bankerPoints >= 8) {
      this.handleGameRoundEnd();
    } else {
      // player needs third card?
      if (needThirdCardPlayerRule(this.baccarat.playerPoints)) {
        this.handleThirdCard("player");
        if (
          // banker according to banker rule
          needThirdCardBankersRule(
            this.baccarat.bankerPoints,
            this.baccarat.playerCards[2].face
          )
        ) {
          this.handleThirdCard("banker");
        }
      } else if (needThirdCardPlayerRule(this.baccarat.bankerPoints)) {
        // player didn't get third card
        // banker according to players rule
        this.handleThirdCard("banker");
      }
      this.handleGameRoundEnd();
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
              this.handleInitialCardsStage();
              break;
            case GameStage.CheckForThirdCard:
              this.handleThirdCardStage();
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
