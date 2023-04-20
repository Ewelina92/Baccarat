import { configure } from "mobx";
import { Card, CardSuit, HandOptions } from "../types";
import { CardStore } from "./cardStore";
import { GameStage, GameStore } from "./gameStore";
import { MainStore } from "./mainStore";
import { PlayerStore } from "./playerStore";
import { SoundStore } from "./soundStore";

const fakeCards: Card[] = [
  { face: "2", suit: CardSuit.Diamond, value: 2, flipped: false },
  { face: "9", suit: CardSuit.Clover, value: 9, flipped: false },
  { face: "jack", suit: CardSuit.Clover, value: 0, flipped: false },
  { face: "8", suit: CardSuit.Heart, value: 8, flipped: false },
  { face: "5", suit: CardSuit.Heart, value: 5, flipped: false }
];

describe("create a MainStore", () => {
  it("should return MainStore with initial settings", () => {
    const store = new MainStore();

    expect(store.player).toBeInstanceOf(PlayerStore);
    expect(store.baccarat).toBeInstanceOf(CardStore);
    expect(store.game).toBeInstanceOf(GameStore);
    expect(store.sound).toBeInstanceOf(SoundStore);
    expect(store.snapshots).toHaveLength(0);
    expect(store.didWin).toBe(false);
  });
});

// describe("sound", () => {
//   const store = new MainStore();

//   it('should set soundVolume to "1" if localStorage value is not "0" or "1"', () => {
//     // spy on localStorage
//     const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
//     getItemSpy.mockImplementation(() => "2");

//     store.getSoundPreference();

//     expect(store.soundVolume).toBe("1");
//     expect(getItemSpy).toHaveBeenCalled();
//     expect(getItemSpy).toHaveBeenCalledWith("volumeForBaccarat");

//     // Clean up
//     getItemSpy.mockRestore();
//   });

//   it("should set soundVolume to same value as localStorage returns", () => {
//     // spy on localStorage
//     const getItemSpy = jest.spyOn(Storage.prototype, "getItem");

//     getItemSpy.mockImplementation(() => "0");
//     store.getSoundPreference();
//     expect(store.soundVolume).toBe("0");

//     getItemSpy.mockImplementation(() => "1");
//     store.getSoundPreference();
//     expect(store.soundVolume).toBe("1");

//     // Clean up
//     getItemSpy.mockRestore();
//   });

//   it("toggle sound correctly", () => {
//     expect(store.soundVolume).toBe("1");

//     store.toggleSound();
//     expect(store.soundVolume).toBe("0");

//     store.toggleSound();
//     expect(store.soundVolume).toBe("1");
//   });
// });

describe("betting", () => {
  const store = new MainStore();
  store.player.setPlayerMoney(100);

  it("should bet on player", () => {
    expect(store.game.playerBet).toBe(0);
    expect(store.player.playerMoney).toBe(100);

    store.betOnPlayer(1);

    expect(store.game.playerBet).toBe(1);
    expect(store.player.playerMoney).toBe(99);
  });

  it("should bet on tie", () => {
    expect(store.game.tieBet).toBe(0);
    expect(store.player.playerMoney).toBe(99);

    store.betOnTie(1);

    expect(store.game.tieBet).toBe(1);
    expect(store.player.playerMoney).toBe(98);
  });

  it("should bet on banker", () => {
    expect(store.game.bankerBet).toBe(0);
    expect(store.player.playerMoney).toBe(98);

    store.betOnBanker(1);

    expect(store.game.bankerBet).toBe(1);
    expect(store.player.playerMoney).toBe(97);
  });
});

describe("double bets", () => {
  const store = new MainStore();

  it("should double all bets", () => {
    store.game.setBankerBet(10);
    store.game.setPlayerBet(10);
    store.game.setTieBet(10);
    store.player.setPlayerMoney(100);

    expect(store.game.playerBet).toBe(10);
    expect(store.game.tieBet).toBe(10);
    expect(store.game.bankerBet).toBe(10);
    expect(store.player.playerMoney).toBe(100);

    store.doubleBets();

    expect(store.game.playerBet).toBe(20);
    expect(store.game.tieBet).toBe(20);
    expect(store.game.bankerBet).toBe(20);
    expect(store.player.playerMoney).toBe(70);
  });

  it("should not double all bets", () => {
    store.player.setPlayerMoney(1);

    expect(store.game.playerBet).toBe(20);
    expect(store.game.tieBet).toBe(20);
    expect(store.game.bankerBet).toBe(20);
    expect(store.player.playerMoney).toBe(1);

    store.doubleBets();

    expect(store.game.playerBet).toBe(20);
    expect(store.game.tieBet).toBe(20);
    expect(store.game.bankerBet).toBe(20);
    expect(store.player.playerMoney).toBe(1);
  });
});

describe("undoLastBet", () => {
  const store = new MainStore();

  beforeEach(() => {
    store.snapshots = [];
  });

  it("should not undo last bet", () => {
    expect(store.snapshots).toHaveLength(0);
    store.createSnapshot();
    expect(store.snapshots).toHaveLength(1);

    store.undoLastBet();
    expect(store.snapshots).toHaveLength(1);
  });

  it("should undo last bet", () => {
    expect(store.snapshots).toHaveLength(0);
    store.createSnapshot();
    store.betOnBanker(100);
    expect(store.game.playerBet).toBe(0);
    store.betOnPlayer(100);

    expect(store.game.bankerBet).toBe(100);
    expect(store.game.playerBet).toBe(100);
    expect(store.snapshots).toHaveLength(3);

    store.undoLastBet();

    expect(store.game.bankerBet).toBe(100);
    expect(store.game.playerBet).toBe(0);
    expect(store.snapshots).toHaveLength(2);
  });
});

describe("winner methods", () => {
  const store = new MainStore();

  beforeEach(() => {
    store.setDidWin(false);
  });

  it("should set didWin state", () => {
    expect(store.didWin).toBe(false);
    store.setDidWin(true);
    expect(store.didWin).toBe(true);
  });

  it("should detect player hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[1]]; // 9
    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Player);
    expect(store.didWin).toBe(false);
  });

  it("should detect player hand as winner with placed bet", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[1]]; // 9
    store.game.setPlayerBet(100);
    expect(store.didWin).toBe(false);

    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Player);
    expect(store.didWin).toBe(true);
  });

  it("should detect tie hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Tie);
    expect(store.didWin).toBe(false);
  });

  it("should detect tie hand as winner with placed bet", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.game.setTieBet(100);
    expect(store.didWin).toBe(false);

    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Tie);
    expect(store.didWin).toBe(true);
  });

  it("should detect banker hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[1]]; // 9
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Banker);
    expect(store.didWin).toBe(false);
  });

  it("should detect banker hand as winner with placed bet", () => {
    store.baccarat.bankerCards = [fakeCards[1]]; // 9
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.game.setBankerBet(100);
    expect(store.didWin).toBe(false);

    store.setWinner();
    expect(store.game.winner).toBe(HandOptions.Banker);
    expect(store.didWin).toBe(true);
  });
});

describe("resets", () => {
  const store = new MainStore();

  beforeEach(() => {
    store.game.setGameStage(GameStage.InitialCards);
    store.createSnapshot();
    store.createSnapshot();
  });

  it("should do a endGameReset", () => {
    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.snapshots).toHaveLength(2);
    expect(store.game.gameStage).toBe(GameStage.InitialCards);

    store.endGameReset();

    expect(store.baccarat.playerCards).toHaveLength(0);
    expect(store.snapshots).toHaveLength(0);
    expect(store.game.gameStage).toBe(GameStage.Start);
  });

  it("should do a betweenRoundsReset", () => {
    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.snapshots).toHaveLength(2);
    expect(store.game.gameStage).toBe(GameStage.InitialCards);
    store.betweenRoundsReset();

    expect(store.baccarat.playerCards).toHaveLength(0);
    expect(store.snapshots).toHaveLength(1);
    expect(store.game.gameStage).toBe(GameStage.InitialBet);
  });
});

describe("should start game", () => {
  const store = new MainStore();
  it("starts game", () => {
    store.startGame(100);
    expect(store.game.gameStage).toBe(GameStage.InitialBet);
    expect(store.player.playerMoney).toBe(100);
  });
});

describe("initialCardStage", () => {
  // allow jest to spy on mobX action
  configure({ safeDescriptors: false });
  const store = new MainStore();

  it("handles initial cards stage", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const setGameStageSpy = jest.spyOn(store.game, "setGameStage");

    store.handleInitialCardsStage();
    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);
    expect(store.baccarat.playerCards[1].flipped).toBe(true);
    expect(store.baccarat.bankerCards[0].flipped).toBe(true);

    jest.advanceTimersByTime(2000);
    expect(setGameStageSpy).toHaveBeenCalledWith(GameStage.CheckForThirdCard);
    jest.useRealTimers();
    jest.resetAllMocks();
  });
});

describe("handle end game round", () => {
  // allow jest to spy on mobX action
  configure({ safeDescriptors: false });

  it("trigger end of game", () => {
    const store = new MainStore();
    store.baccarat.playerCards = [fakeCards[1], fakeCards[2]]; // 9, 0
    store.baccarat.bankerCards = [fakeCards[2], fakeCards[3]]; // 0, 8
    store.game.setWinner("");

    jest.useFakeTimers();
    const setWinnerSpy = jest.spyOn(store, "setWinner");
    const endGameResetSpy = jest.spyOn(store, "endGameReset");

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);
    store.player.setPlayerMoney(0);

    store.handleGameRoundEnd();

    jest.advanceTimersByTime(2000);
    expect(store.game.winner).toBe("Player");
    expect(setWinnerSpy).toHaveBeenCalled();
    jest.advanceTimersByTime(6000);
    expect(endGameResetSpy).toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("should reset game", () => {
    const store = new MainStore();
    store.baccarat.playerCards = [fakeCards[1], fakeCards[2]]; // 9, 0
    store.baccarat.bankerCards = [fakeCards[2], fakeCards[3]]; // 0, 8
    store.game.setWinner("");
    jest.useFakeTimers();
    const setWinnerSpy = jest.spyOn(store, "setWinner");
    const resetSpy = jest.spyOn(store, "betweenRoundsReset");

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);
    store.player.setPlayerMoney(10);

    store.handleGameRoundEnd();

    jest.advanceTimersByTime(2000);
    expect(store.game.winner).toBe("Player");
    expect(setWinnerSpy).toHaveBeenCalled();
    jest.advanceTimersByTime(6000);
    expect(resetSpy).toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });
});

describe("handle third card", () => {
  // allow jest to spy on mobX action
  configure({ safeDescriptors: false });

  it("should handle player's third card", () => {
    const store = new MainStore();
    jest.useFakeTimers();

    store.baccarat.givePlayerACard();
    store.baccarat.givePlayerACard();

    expect(store.baccarat.playerCards).toHaveLength(2);

    store.handleThirdCard("player");

    jest.advanceTimersByTime(500);

    expect(store.baccarat.playerCards[2].flipped).toBe(true);

    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("should handle bankers's third card", () => {
    const store = new MainStore();
    jest.useFakeTimers();

    store.baccarat.giveBankerACard();
    store.baccarat.giveBankerACard();

    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.handleThirdCard("banker");

    jest.advanceTimersByTime(500);

    expect(store.baccarat.bankerCards[2].flipped).toBe(true);

    jest.useRealTimers();
    jest.resetAllMocks();
  });
});

describe("handleThirdCardStage", () => {
  // allow jest to spy on mobX action
  configure({ safeDescriptors: false });

  it("should end game after initial cards", () => {
    jest.useFakeTimers();
    const store = new MainStore();
    const handleGameRoundEndSpy = jest.spyOn(store, "handleGameRoundEnd");
    const handleThirdCardSpy = jest.spyOn(store, "handleThirdCard");

    store.baccarat.playerCards = [fakeCards[0], fakeCards[1]]; // 2, 9 -> 1
    store.baccarat.bankerCards = [fakeCards[1], fakeCards[2]]; // 9, 0 -> 9

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.handleThirdCardStage();
    jest.runAllTimers();

    expect(handleGameRoundEndSpy).toHaveBeenCalled();
    expect(handleThirdCardSpy).not.toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("player should get a third card", () => {
    jest.useFakeTimers();
    const store = new MainStore();
    const handleThirdCardSpy = jest.spyOn(store, "handleThirdCard");
    const handleGameRoundEndSpy = jest.spyOn(store, "handleGameRoundEnd");

    store.baccarat.playerCards = [fakeCards[0], fakeCards[0]]; // 2, 2 -> 4
    store.baccarat.bankerCards = [fakeCards[0], fakeCards[4]]; // 2, 5 -> 7

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.handleThirdCardStage();
    jest.runAllTimers();

    expect(handleThirdCardSpy).toHaveBeenCalled();
    expect(handleThirdCardSpy).toHaveBeenCalledWith("player");
    expect(handleGameRoundEndSpy).toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("banker should get a third card", () => {
    jest.useFakeTimers();
    const store = new MainStore();
    const handleThirdCardSpy = jest.spyOn(store, "handleThirdCard");
    const handleGameRoundEndSpy = jest.spyOn(store, "handleGameRoundEnd");

    store.baccarat.playerCards = [fakeCards[0], fakeCards[4]]; // 2, 5 -> 7
    store.baccarat.bankerCards = [fakeCards[0], fakeCards[0]]; // 2, 2 -> 4

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.handleThirdCardStage();
    jest.runAllTimers();

    expect(handleThirdCardSpy).toHaveBeenCalled();
    expect(handleThirdCardSpy).toHaveBeenCalledWith("banker");
    expect(handleThirdCardSpy).not.toHaveBeenCalledWith("player");
    expect(handleGameRoundEndSpy).toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("player and banker should get a third card", () => {
    jest.useFakeTimers();
    const store = new MainStore();
    const handleThirdCardSpy = jest.spyOn(store, "handleThirdCard");
    const handleGameRoundEndSpy = jest.spyOn(store, "handleGameRoundEnd");

    store.baccarat.playerCards = [fakeCards[0], fakeCards[0]]; // 2, 2 -> 4
    store.baccarat.bankerCards = [fakeCards[2], fakeCards[2]]; // 0, 0 -> 0

    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.handleThirdCardStage();
    jest.runAllTimers();

    expect(handleThirdCardSpy).toHaveBeenCalled();
    expect(handleThirdCardSpy).toHaveBeenCalledWith("player");
    expect(handleThirdCardSpy).toHaveBeenCalledWith("banker");
    expect(handleGameRoundEndSpy).toHaveBeenCalled();

    jest.useRealTimers();
    jest.resetAllMocks();
  });
});
