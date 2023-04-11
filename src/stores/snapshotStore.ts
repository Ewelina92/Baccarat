import { makeAutoObservable } from "mobx";
import { GameStore } from "./gameStore";
import { PlayerStore } from "./playerStore";

export class Snapshot {
  game: GameStore;

  player: PlayerStore;

  playerBet: number;

  tieBet: number;

  bankerBet: number;

  playerMoney: number;

  constructor(
    game: GameStore,
    player: PlayerStore,
    playerBet: number,
    tieBet: number,
    bankerBet: number,
    playerMoney: number
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.game = game;
    this.player = player;
    this.playerBet = playerBet;
    this.tieBet = tieBet;
    this.bankerBet = bankerBet;
    this.playerMoney = playerMoney;
  }

  undo() {
    this.game.playerBet = this.playerBet;
    this.game.tieBet = this.tieBet;
    this.game.bankerBet = this.bankerBet;
    this.player.playerMoney = this.playerMoney;
  }
}
