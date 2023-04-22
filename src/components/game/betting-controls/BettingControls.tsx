import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { BettingChips } from "./betting-chips/BettingChips";
import { BettingFields } from "./betting-fields/BettingFields";
import { BettingButtons } from "./betting-buttons/BettingButtons";
import { GameStage } from "../../../stores/gameStore";
import { useMainStore } from "../../../hooks/useMainStore";
import { useAudio } from "../../../hooks/useAudio";
import { playAudio } from "../../../utils";
import startSound from "../../../sounds/place-bets-please.mp3";

export const BettingControls = observer(() => {
  const { game, sound } = useMainStore();
  const startAudio = useAudio(startSound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet) {
      playAudio(startAudio, +sound.soundVolume);
    }
  }, [game.gameStage]);

  return (
    <>
      <BettingFields />
      <BettingChips />
      <BettingButtons />
    </>
  );
});
