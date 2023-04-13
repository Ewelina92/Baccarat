import { makeAutoObservable } from "mobx";

export enum GameStage {
  InitialBet,
  InitialCards,
  CheckForThirdCard,
  Continue,
  End
}

export class GameStore {
  gameStage: GameStage = GameStage.InitialBet;

  gameRound = 0;

  playerBet = 0;

  tieBet = 0;

  bankerBet = 0;

  winner = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get totalBet() {
    return this.playerBet + this.tieBet + this.bankerBet;
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
    this.playerBet = 0;
    this.tieBet = 0;
    this.bankerBet = 0;
  }

  setWinner(winner: string) {
    this.winner = winner;
  }

  resetWinner() {
    this.winner = "";
  }

  nextRound() {
    this.gameRound += 1;
  }

  resetGame() {
    this.setGameStage(GameStage.InitialBet);
    this.gameRound = 0;
    // this.bet = 0;
    this.resetBets();
    this.playerBet = 0;
    this.tieBet = 0;
    this.bankerBet = 0;
    this.resetWinner();
  }
}
