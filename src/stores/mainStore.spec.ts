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

describe("create a playerStore with default settings", () => {
  it("should return playerMoney 0", () => {
    const store = new MainStore();

    expect(store.player).toBeInstanceOf(PlayerStore);
    expect(store.baccarat).toBeInstanceOf(CardStore);
    expect(store.game).toBeInstanceOf(GameStore);
    expect(store.snapshots).toHaveLength(0);
    expect(store.soundVolume).toEqual("1");
    expect(store.didWin).toBeFalsy();
  });
});

describe("sound method should work", () => {
  const store = new MainStore();
  it("toggle sound correctly", () => {
    store.toggleSound();
    expect(store.soundVolume).toEqual("0");

    store.toggleSound();
    expect(store.soundVolume).toEqual("1");
  });
});

describe("betting should work", () => {
  const store = new MainStore();
  store.player.setInitialMoney(100);
  it("bet on player", () => {
    store.betOnPlayer(1);

    expect(store.game.playerBet).toEqual(1);
    expect(store.player.playerMoney).toEqual(99);
  });

  it("bet on tie", () => {
    store.betOnTie(1);

    expect(store.game.tieBet).toEqual(1);
    expect(store.player.playerMoney).toEqual(98);
  });

  it("bet on banker", () => {
    store.betOnBanker(1);

    expect(store.game.bankerBet).toEqual(1);
    expect(store.player.playerMoney).toEqual(97);
  });

  it("double bets should work", () => {
    store.doubleBets();
    expect(store.game.bankerBet).toEqual(2);
    expect(store.player.playerMoney).toEqual(94);
  });

  it("undo last bet should work", () => {
    store.undoLastBet();
    expect(store.game.bankerBet).toEqual(1);
    expect(store.player.playerMoney).toEqual(97);
  });
});

describe("winner methods should work", () => {
  const store = new MainStore();
  it("should set didWin state", () => {
    expect(store.didWin).toBeFalsy();
    store.setDidWin(true);
    expect(store.didWin).toBeTruthy();
  });

  it("should detect player hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[1]]; // 9
    store.setWinner();
    expect(store.game.winner).toEqual(HandOptions.Player);
  });

  it("should detect tie hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[0]]; // 2
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.setWinner();
    expect(store.game.winner).toEqual(HandOptions.Tie);
  });

  it("should detect banker hand as winner", () => {
    store.baccarat.bankerCards = [fakeCards[1]]; // 9
    store.baccarat.playerCards = [fakeCards[0]]; // 2
    store.setWinner();
    expect(store.game.winner).toEqual(HandOptions.Banker);
  });
});

describe("should handle resets", () => {
  const store = new MainStore();
  it("set endGameReset", () => {
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
