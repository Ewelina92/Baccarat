import { GameStage, GameStore } from "./gameStore";

describe("create a playerStore with default settings", () => {
  it("should return playerMoney 0", () => {
    const gameStore = new GameStore();

    expect(gameStore.gameStage).toEqual(GameStage.Start);
    expect(gameStore.playerBet).toEqual(0);
    expect(gameStore.tieBet).toEqual(0);
    expect(gameStore.bankerBet).toEqual(0);
    expect(gameStore.winner).toEqual("");
    expect(gameStore.chosenBetValue).toEqual(0);
    expect(gameStore.time).toEqual(0);
    expect(gameStore.timer).toEqual(undefined);
  });
});

describe("gameStage methods should work", () => {
  it("should set gameStage correctly", () => {
    const gameStore = new GameStore();
    gameStore.setGameStage(GameStage.InitialBet);

    expect(gameStore.gameStage).toEqual(GameStage.InitialBet);
  });
});

describe("time methods should work", () => {
  const gameStore = new GameStore();
  it("should set time correctly", () => {
    gameStore.setTime(60);

    expect(gameStore.time).toEqual(60);
  });

  it("should add to time correctly", () => {
    gameStore.addToTime(1);

    expect(gameStore.time).toEqual(61);
  });

  it("should start and stop timer correctly", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");

    gameStore.startTimer();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    gameStore.stopTimer();
    expect(gameStore.time).toEqual(0);
  });
});

describe("betting methods should work", () => {
  const gameStore = new GameStore();

  it("should set player bet to 1", () => {
    gameStore.setPlayerBet(1);
    expect(gameStore.playerBet).toEqual(1);
  });

  it("should set tie bet to 1", () => {
    gameStore.setTieBet(1);
    expect(gameStore.playerBet).toEqual(1);
  });

  it("should set banker bet to 1", () => {
    gameStore.setBankerBet(1);
    expect(gameStore.playerBet).toEqual(1);
  });

  it("should increase player bet by 1", () => {
    gameStore.addToPlayerBet(1);
    expect(gameStore.playerBet).toEqual(2);
  });

  it("should increase tie bet by 1", () => {
    gameStore.addToTieBet(1);
    expect(gameStore.playerBet).toEqual(2);
  });

  it("should increase banker bet by 1", () => {
    gameStore.addToBankerBet(1);
    expect(gameStore.playerBet).toEqual(2);
  });

  it("should double all bets", () => {
    gameStore.doubleAllBets();
    expect(gameStore.playerBet).toEqual(4);
    expect(gameStore.tieBet).toEqual(4);
    expect(gameStore.bankerBet).toEqual(4);
  });

  it("should return total bet", () => {
    expect(gameStore.totalBet).toEqual(12); // 4 * 3
  });

  it("should reset all bets", () => {
    gameStore.resetBets();
    expect(gameStore.playerBet).toEqual(0);
    expect(gameStore.tieBet).toEqual(0);
    expect(gameStore.bankerBet).toEqual(0);
  });

  it("should set bet value correctly", () => {
    gameStore.setChosenBetValue(5);
    expect(gameStore.chosenBetValue).toEqual(5);
  });
});

describe("winner method should work", () => {
  it("should set winner correctly", () => {
    const gameStore = new GameStore();
    gameStore.setWinner("player");

    expect(gameStore.winner).toEqual("player");
  });
});

describe("reset methods should work", () => {
  const gameStore = new GameStore();

  it("should fully reset", () => {
    gameStore.gameStage = GameStage.InitialCards;
    gameStore.fullReset();

    expect(gameStore.gameStage).toEqual(GameStage.Start);
  });

  it("should partially reset", () => {
    gameStore.setPlayerBet(100);
    gameStore.betweenRoundsReset();

    expect(gameStore.gameStage).toEqual(GameStage.InitialBet);
    expect(gameStore.playerBet).toEqual(0);
  });
});
