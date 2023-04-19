import { Card, CardSuit, HandOptions } from "../types";
import { CardStore } from "./cardStore";
import { GameStage, GameStore } from "./gameStore";
import { MainStore } from "./mainStore";
import { PlayerStore } from "./playerStore";

const fakeCards: Card[] = [
  { face: "2", suit: CardSuit.Diamond, value: 2, flipped: false },
  { face: "9", suit: CardSuit.Clover, value: 9, flipped: false },
  { face: "jack", suit: CardSuit.Clover, value: 0, flipped: false },
  { face: "8", suit: CardSuit.Heart, value: 8, flipped: false },
  { face: "4", suit: CardSuit.Heart, value: 4, flipped: false }
];

describe("create a MainStore", () => {
  it("should return MainStore with initial settings", () => {
    const store = new MainStore();

    expect(store.player).toBeInstanceOf(PlayerStore);
    expect(store.baccarat).toBeInstanceOf(CardStore);
    expect(store.game).toBeInstanceOf(GameStore);
    expect(store.snapshots).toHaveLength(0);
    expect(store.soundVolume).toBe("1");
    expect(store.didWin).toBe(false);
  });
});

describe("sound toggling", () => {
  const store = new MainStore();
  it("toggle sound correctly", () => {
    expect(store.soundVolume).toBe("1");

    store.toggleSound();
    expect(store.soundVolume).toBe("0");

    store.toggleSound();
    expect(store.soundVolume).toBe("1");
  });
});

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

  it("should double all bets", () => {
    expect(store.game.playerBet).toBe(1);
    expect(store.game.tieBet).toBe(1);
    expect(store.game.bankerBet).toBe(1);
    expect(store.player.playerMoney).toBe(97);

    store.doubleBets();

    expect(store.game.playerBet).toBe(2);
    expect(store.game.tieBet).toBe(2);
    expect(store.game.bankerBet).toBe(2);
    expect(store.player.playerMoney).toBe(94);
  });

  it("should undo last bet", () => {
    expect(store.game.playerBet).toBe(2);
    expect(store.game.tieBet).toBe(2);
    expect(store.game.bankerBet).toBe(2);
    expect(store.player.playerMoney).toBe(94);

    store.undoLastBet();

    expect(store.game.playerBet).toBe(1);
    expect(store.game.tieBet).toBe(1);
    expect(store.game.bankerBet).toBe(1);
    expect(store.player.playerMoney).toBe(97);
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
  store.game.setGameStage(GameStage.InitialCards);

  it("set endGameReset", () => {
    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.snapshots).toHaveLength(0);
    expect(store.game.gameStage).toEqual(GameStage.InitialCards);

    store.endGameReset();

    expect(store.baccarat.playerCards).toHaveLength(0);
    expect(store.snapshots).toHaveLength(0);
    expect(store.game.gameStage).toEqual(GameStage.Start);
  });

  it("set betweenRoundsReset", () => {
    store.betweenRoundsReset();

    expect(store.baccarat.playerCards).toHaveLength(0);
    expect(store.snapshots).toHaveLength(1);
    expect(store.game.gameStage).toEqual(GameStage.InitialBet);
  });
});

describe("should start game", () => {
  const store = new MainStore();
  it("starts game", () => {
    store.startGame(100);
    expect(store.game.gameStage).toEqual(GameStage.InitialBet);
    expect(store.player.playerMoney).toEqual(100);
  });
});

describe("should handle game stages", () => {
  const store = new MainStore();

  it("handles initial cards stage", () => {
    store.handleInitialCardsStage();
    expect(store.baccarat.playerCards).toHaveLength(2);
    expect(store.baccarat.bankerCards).toHaveLength(2);
    expect(store.baccarat.playerCards[1].flipped).toBeTruthy();
    expect(store.baccarat.bankerCards[0].flipped).toBeTruthy();
  });

  it("handles third card", () => {
    store.handleThirdCard("player");
    expect(store.baccarat.playerCards).toHaveLength(3);
    expect(store.baccarat.bankerCards).toHaveLength(2);

    store.baccarat.playerCards.pop();
    store.handleThirdCard("banker");
    expect(store.baccarat.bankerCards).toHaveLength(3);
    expect(store.baccarat.playerCards).toHaveLength(2);
  });
});
