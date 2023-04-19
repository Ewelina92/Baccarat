import { PlayerStore } from "./playerStore";

describe("create a playerStore", () => {
  it("should return playerMoney 0", () => {
    const player = new PlayerStore();

    expect(player.playerMoney).toBe(0);
  });
});

describe("money changes", () => {
  const player = new PlayerStore();

  it("should set amount of money to 1", () => {
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
