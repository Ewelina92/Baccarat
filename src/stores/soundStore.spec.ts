import { configure } from "mobx";
import { SoundStore } from "./soundStore";

describe("create a SoundStore", () => {
  it("should return MainStore with initial settings", () => {
    const store = new SoundStore();
    expect(store.soundVolume).toBe("");
  });
});

describe("sound", () => {
  const store = new SoundStore();

  it('should set soundVolume to "1" if localStorage value is not "0" or "1"', () => {
    // spy on localStorage
    const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockImplementation(() => "2");

    store.getSoundPreference();

    expect(store.soundVolume).toBe("1");
    expect(getItemSpy).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalledWith("volumeForBaccarat");

    // Clean up
    getItemSpy.mockRestore();
  });

  it("should set soundVolume to same value as localStorage returns", () => {
    // spy on localStorage
    const getItemSpy = jest.spyOn(Storage.prototype, "getItem");

    getItemSpy.mockImplementation(() => "0");
    store.getSoundPreference();
    expect(store.soundVolume).toBe("0");

    getItemSpy.mockImplementation(() => "1");
    store.getSoundPreference();
    expect(store.soundVolume).toBe("1");

    // Clean up
    getItemSpy.mockRestore();
  });

  it("toggle sound correctly", () => {
    expect(store.soundVolume).toBe("1");

    store.toggleSound();
    expect(store.soundVolume).toBe("0");

    store.toggleSound();
    expect(store.soundVolume).toBe("1");
  });
});
