import { PlayerStore } from "./playerStore";

const player = new PlayerStore();

describe("create a playerStore", () => {
  it("should return playerMoney 0", () => {
    expect(player.playerMoney).toBe(0);
  });
});

describe("money changes", () => {
  it("should set amount of money to 1", () => {
    expect(player.playerMoney).toBe(0);
    player.setPlayerMoney(1);
    expect(player.playerMoney).toBe(1);
  });

  it("should reset amount of money back to 0", () => {
    player.resetPlayer();
    expect(player.playerMoney).toBe(0);
  });

  it("should increment amount of money by 2", () => {
    player.addPlayerMoney(2);
    expect(player.playerMoney).toBe(2);
  });

  it("should decrement amount of money by 2", () => {
    player.removePlayerMoney(2);
    expect(player.playerMoney).toBe(0);
  });
});
