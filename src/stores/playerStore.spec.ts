import { PlayerStore } from "./playerStore";

describe("create a playerStore with default settings", () => {
  it("should return playerMoney 0", () => {
    const player = new PlayerStore();

    expect(player.playerMoney).toEqual(0);
  });
});

describe("playerStore methods should work", () => {
  const player = new PlayerStore();
  it("should set amount of money to 1", () => {
    player.setPlayerMoney(1);
    expect(player.playerMoney).toEqual(1);
  });

  it("should reset amount of money back to 0", () => {
    player.resetPlayer();
    expect(player.playerMoney).toEqual(0);
  });

  it("should set initial amount of money to 1", () => {
    player.setInitialMoney(1);
    expect(player.playerMoney).toEqual(1);
  });

  it("should increment amount of money by 2", () => {
    player.addPlayerMoney(2);
    expect(player.playerMoney).toEqual(3);
  });

  it("should decrement amount of money by 2", () => {
    player.removePlayerMoney(2);
    expect(player.playerMoney).toEqual(1);
  });
});
