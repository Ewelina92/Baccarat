import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { StartScreen } from "./StartScreen";
import { MainStoreContext, mainStore } from "../../stores/MainStore";

describe("StartScreen", () => {
  it("should render", async () => {
    const { getByRole } = render(
      <MainStoreContext.Provider value={mainStore}>
        <StartScreen />
      </MainStoreContext.Provider>
    );
    const mainheading = getByRole("heading", { name: "Welcome to Baccarat" });
    expect(mainheading).toBeInTheDocument();
    expect.assertions(1);
  });
});
