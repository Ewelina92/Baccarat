import { configure } from "mobx";
import { GameStage, GameStore } from "./gameStore";

describe("create a GameStore", () => {
  it("should return GameStore with initial settings", () => {
    const gameStore = new GameStore();

    expect(gameStore.gameStage).toBe(GameStage.Start);
    expect(gameStore.playerBet).toBe(0);
    expect(gameStore.tieBet).toBe(0);
    expect(gameStore.bankerBet).toBe(0);
    expect(gameStore.winner).toBe("");
    expect(gameStore.chosenBetValue).toBe(0);
    expect(gameStore.time).toBe(0);
    expect(gameStore.timer).toBe(undefined);
  });
});

describe("set gameStage", () => {
  it("should set gameStage correctly", () => {
    const gameStore = new GameStore();
    gameStore.setGameStage(GameStage.InitialBet);

    expect(gameStore.gameStage).toBe(GameStage.InitialBet);
  });
});

describe("time methods", () => {
  // allow jest to spy on mobX action
  configure({ safeDescriptors: false });
  const gameStore = new GameStore();

  it("should set time correctly", () => {
    expect(gameStore.time).toBe(0);
    gameStore.setTime(60);
    expect(gameStore.time).toBe(60);
  });

  it("should add to time correctly", () => {
    expect(gameStore.time).toBe(60);
    gameStore.addToTime(1);
    expect(gameStore.time).toBe(61);
  });

  it("should start and stop timer correctly", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");

    const addToTimeSpy = jest.spyOn(gameStore, "addToTime");

    gameStore.startTimer();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Advance the timer by 1 second
    jest.advanceTimersByTime(1000);

    // Check that addToTime has been called with 1 as the argument
    expect(addToTimeSpy).toHaveBeenCalledTimes(1);
    expect(addToTimeSpy).toHaveBeenCalledWith(1);

    gameStore.stopTimer();
    expect(gameStore.time).toBe(0);
    jest.useRealTimers();
  });
});

describe("betting", () => {
  const gameStore = new GameStore();

  it("should set player bet to 1", () => {
    expect(gameStore.playerBet).toBe(0);
    gameStore.setPlayerBet(1);
    expect(gameStore.playerBet).toBe(1);
  });

  it("should set tie bet to 1", () => {
    expect(gameStore.tieBet).toBe(0);
    gameStore.setTieBet(1);
    expect(gameStore.tieBet).toBe(1);
  });

  it("should set banker bet to 1", () => {
    expect(gameStore.bankerBet).toBe(0);
    gameStore.setBankerBet(1);
    expect(gameStore.bankerBet).toBe(1);
  });

  it("should increase player bet by 1", () => {
    expect(gameStore.playerBet).toBe(1);
    gameStore.addToPlayerBet(1);
    expect(gameStore.playerBet).toBe(2);
  });

  it("should increase tie bet by 1", () => {
    expect(gameStore.tieBet).toBe(1);
    gameStore.addToTieBet(1);
    expect(gameStore.tieBet).toBe(2);
  });

  it("should increase banker bet by 1", () => {
    expect(gameStore.bankerBet).toBe(1);
    gameStore.addToBankerBet(1);
    expect(gameStore.bankerBet).toBe(2);
  });

  it("should double all bets", () => {
    expect(gameStore.playerBet).toBe(2);
    expect(gameStore.tieBet).toBe(2);
    expect(gameStore.bankerBet).toBe(2);

    gameStore.doubleAllBets();

    expect(gameStore.playerBet).toBe(4);
    expect(gameStore.tieBet).toBe(4);
    expect(gameStore.bankerBet).toBe(4);
  });

  it("should return total bet", () => {
    expect(gameStore.playerBet).toBe(4);
    expect(gameStore.tieBet).toBe(4);
    expect(gameStore.bankerBet).toBe(4);
    expect(gameStore.totalBet).toBe(12); // 4 * 3
  });

  it("should reset all bets", () => {
    expect(gameStore.playerBet).toBe(4);
    expect(gameStore.tieBet).toBe(4);
    expect(gameStore.bankerBet).toBe(4);

    gameStore.resetBets();

    expect(gameStore.playerBet).toBe(0);
    expect(gameStore.tieBet).toBe(0);
    expect(gameStore.bankerBet).toBe(0);
  });

  it("should set bet value correctly", () => {
    expect(gameStore.chosenBetValue).toBe(0);
    gameStore.setChosenBetValue(5);
    expect(gameStore.chosenBetValue).toBe(5);
  });
});

describe("set winner", () => {
  it("should set winner correctly", () => {
    const gameStore = new GameStore();
    gameStore.setWinner("player");

    expect(gameStore.winner).toBe("player");
  });
});

describe("reset", () => {
  const gameStore = new GameStore();

  it("should fully reset", () => {
    gameStore.gameStage = GameStage.InitialCards;
    expect(gameStore.gameStage).toBe(GameStage.InitialCards);

    gameStore.fullReset();
    expect(gameStore.gameStage).toBe(GameStage.Start);
  });

  it("should partially reset", () => {
    expect(gameStore.gameStage).toBe(GameStage.Start);
    gameStore.setPlayerBet(100);
    gameStore.betweenRoundsReset();

    expect(gameStore.gameStage).toBe(GameStage.InitialBet);
    expect(gameStore.playerBet).toBe(0);
  });
});
