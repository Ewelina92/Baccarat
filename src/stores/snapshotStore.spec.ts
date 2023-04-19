import { Snapshot } from "./snapshotStore";
import { MainStore } from "./mainStore";
import { GameStore } from "./gameStore";
import { PlayerStore } from "./playerStore";

const mainStore = new MainStore();

describe("Snapshot", () => {
  const snapshots: Snapshot[] = [];

  it("should create a snapshot", () => {
    const snapshot = new Snapshot(mainStore.game, mainStore.player);
    snapshots.push(snapshot);

    expect(snapshots).toHaveLength(1);
    expect(snapshot).toStrictEqual(
      expect.objectContaining({
        game: expect.any(GameStore),
        player: expect.any(PlayerStore),
        playerBet: expect.any(Number),
        tieBet: expect.any(Number),
        bankerBet: expect.any(Number),
        playerMoney: expect.any(Number)
      })
    );
  });

  it("should undo", () => {
    expect(mainStore.game.bankerBet).toBe(0);
    mainStore.game.setBankerBet(100);
    const snapshot = new Snapshot(mainStore.game, mainStore.player);
    snapshots.push(snapshot);

    expect(snapshots).toHaveLength(2);
    expect(mainStore.game.bankerBet).toBe(100);

    snapshots[0].undo();
    expect(mainStore.game.bankerBet).toBe(0);
  });
});
