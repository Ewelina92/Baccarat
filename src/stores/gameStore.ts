import { makeAutoObservable } from "mobx";

export enum GameStage {
  Start,
  InitialBet,
  InitialCards,
  CheckForThirdCard,
  Continue,
  End
}

export class GameStore {
  gameStage: GameStage = GameStage.Start;

  playerBet = 0;

  tieBet = 0;

  bankerBet = 0;

  winner = "";

  chosenBetValue = 0;

  time = 0;

  timer: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get totalBet() {
    return this.playerBet + this.tieBet + this.bankerBet;
  }

  setTime(time: number) {
    this.time = time;
  }

  addToTime(amount: number) {
    this.time += amount;
  }

  startTimer() {
    const timer = window.setInterval(() => {
      this.addToTime(1);
    }, 1000);
    this.timer = timer;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setTime(0);
  }

  setChosenBetValue(value: number) {
    this.chosenBetValue = value;
  }

  setGameStage(gameStage: GameStage) {
    this.gameStage = gameStage;
  }

  setPlayerBet(amount: number) {
    this.playerBet = amount;
  }

  setTieBet(amount: number) {
    this.tieBet = amount;
  }

  setBankerBet(amount: number) {
    this.bankerBet = amount;
  }

  doubleAllBets() {
    this.playerBet *= 2;
    this.bankerBet *= 2;
    this.tieBet *= 2;
  }

  addToPlayerBet(bet: number) {
    this.playerBet += bet;
  }

  addToTieBet(bet: number) {
    this.tieBet += bet;
  }

  addToBankerBet(bet: number) {
    this.bankerBet += bet;
  }

  resetBets() {
    this.setPlayerBet(0);
    this.setTieBet(0);
    this.setBankerBet(0);
  }

  setWinner(winner: string) {
    this.winner = winner;
  }

  fullReset() {
    this.setGameStage(GameStage.Start);
    this.resetBets();
    this.setWinner("");
    this.stopTimer();
  }

  betweenRoundsReset() {
    this.setGameStage(GameStage.InitialBet);
    this.resetBets();
    this.setWinner("");
  }
}
