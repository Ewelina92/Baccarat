import { makeAutoObservable } from "mobx";

export class PlayerStore {
  playerMoney = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPlayerMoney(amount: number) {
    this.playerMoney = amount;
  }

  addPlayerMoney(amount: number) {
    this.playerMoney += amount;
  }

  removePlayerMoney(amount: number) {
    this.playerMoney -= amount;
  }

  resetPlayer() {
    this.setPlayerMoney(0);
  }
}
