import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GameStage } from "../../stores/gameStore";
import startSound from "../../sounds/place-bets-please.mp3";
import { BettingChips } from "./BettingChips";
import { BettingFields } from "./BettingFields";
import { BettingButtons } from "./BettingButtons";
import { useMainStore } from "../../hooks/useMainStore";
import { useAudio } from "../../hooks/useAudio";

import { playAudio } from "../../utils";

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
