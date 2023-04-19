import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MainStoreContext, mainStore } from "../../stores/mainStore";
import { BettingControls } from "./BettingControls";
import { GameStage } from "../../stores/gameStore";

describe("BettingControls", () => {
  it('plays deal sound when "Deal" button is clicked', () => {
    const store = mainStore;
    // Make sure button isn't disabled
    store.game.setGameStage(GameStage.InitialBet);
    store.game.setBankerBet(1);

    // Create a mock function for the play() method of the Audio DOM API
    const playMock = jest.fn();
    window.HTMLMediaElement.prototype.play = playMock;

    const { getByText } = render(
      <MainStoreContext.Provider value={store}>
        <BettingControls />
      </MainStoreContext.Provider>
    );

    const dealButton = getByText("Deal");
    fireEvent.click(dealButton);

    expect(playMock).toHaveBeenCalled();
  });
});
