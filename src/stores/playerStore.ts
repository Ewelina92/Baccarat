import { makeAutoObservable } from "mobx";

export class PlayerStore {
  playerName = "";

  playerMoney = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  addPlayerMoney(amount: number) {
    this.playerMoney += amount;
  }

  resetPlayer() {
    this.playerName = "";
    this.playerMoney = 0;
  }
}
