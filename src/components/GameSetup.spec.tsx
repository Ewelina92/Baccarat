import "@testing-library/jest-dom";
import React from "react";
import { GameSetup } from "../components/GameSetup";
import { render } from "@testing-library/react";
import { MainStoreContext, mainStore, GameStage } from "../stores/MainStore";

describe("StartScreen", () => {
  it("should render the start screen", async () => {
    const store = mainStore;
    const { getByRole } = render(
      <MainStoreContext.Provider value={store}>
        <GameSetup />
      </MainStoreContext.Provider>
    );
    const mainheading = getByRole("heading", { name: "Welcome to Baccarat" });
    expect(mainheading).toBeInTheDocument();
    expect.assertions(1);
  });

  it("should render the game field", async () => {
    const store = mainStore;
    store.setGameStage(GameStage.InitalCards);
    const { getByRole } = render(
      <MainStoreContext.Provider value={store}>
        <GameSetup />
      </MainStoreContext.Provider>
    );
    const mainheading = getByRole("heading", { name: "Playing Baccarat" });
    expect(mainheading).toBeInTheDocument();
    expect.assertions(1);
  });
});
