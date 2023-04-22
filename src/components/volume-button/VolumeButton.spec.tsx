import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MainStoreContext, mainStore } from "../../stores/mainStore";
import { VolumeButton } from "./VolumeButton";

describe("VolumeButton", () => {
  it("should toggle the volume button when clicked", () => {
    const store = mainStore;
    const { getByRole } = render(
      <MainStoreContext.Provider value={store}>
        <VolumeButton />
      </MainStoreContext.Provider>
    );
    const button = getByRole("button");

    // Button should initially have volume_up icon
    expect(button.innerHTML).toContain("volume_up");

    // Click the button to toggle the volume
    fireEvent.click(button);

    // Button should now have volume_off icon
    expect(button.innerHTML).toContain("volume_off");

    // Click the button again to toggle the volume back
    fireEvent.click(button);

    // Button should now have volume_up icon again
    expect(button.innerHTML).toContain("volume_up");
  });
});
