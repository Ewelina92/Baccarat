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

  setPlayerMoney(amount: number) {
    this.playerMoney = amount;
  }

  addPlayerMoney(amount: number) {
    this.playerMoney += amount;
  }

  setInitialData(name: string, amount: number) {
    this.setPlayerName(name);
    this.setPlayerMoney(amount);
  }

  removePlayerMoney(amount: number) {
    this.playerMoney -= amount;
  }

  resetPlayer() {
    this.setPlayerName("");
    this.setPlayerMoney(0);
  }
}
