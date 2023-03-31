import { makeAutoObservable } from "mobx";

export enum GameStage {
  Start,
  InitialBet,
  SecondBet,
  InitialCards,
  CheckForThirdCard,
  Continue,
  End
}

export class GameStore {
  gameStage: GameStage = GameStage.Start;

  gameRound = 1;

  bet = 0;

  winner = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setGameStage(gameStage: GameStage) {
    this.gameStage = gameStage;
  }

  setCurrentBet(bet: number) {
    this.bet += bet;
  }

  setNewBet(bet: number) {
    this.bet = bet;
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
    this.setGameStage(GameStage.Start);
    this.gameRound = 1;
    this.bet = 0;
    this.resetWinner();
  }
}
