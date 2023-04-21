import { makeAutoObservable } from "mobx";

export class SoundStore {
  soundVolume = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleSound() {
    if (this.soundVolume === "1") {
      localStorage.setItem("volumeForBaccarat", "0");
      this.soundVolume = "0";
    } else {
      localStorage.setItem("volumeForBaccarat", "1");
      this.soundVolume = "1";
    }
  }

  getSoundPreference() {
    const volume = localStorage.getItem("volumeForBaccarat");
    if (volume === "0" || volume === "1") {
      this.soundVolume = volume;
    } else {
      this.soundVolume = "1";
    }
  }
}
