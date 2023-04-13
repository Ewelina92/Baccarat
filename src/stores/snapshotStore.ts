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

  constructor(game: GameStore, player: PlayerStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.game = game;
    this.player = player;
    this.playerBet = game.playerBet;
    this.tieBet = game.tieBet;
    this.bankerBet = game.bankerBet;
    this.playerMoney = player.playerMoney;
  }

  undo() {
    this.game.setPlayerBet(this.playerBet);
    this.game.setTieBet(this.tieBet);
    this.game.setBankerBet(this.bankerBet);
    this.player.setPlayerMoney(this.playerMoney);
  }
}
