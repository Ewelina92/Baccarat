import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import sound from "./place-bets-please.mp3";
import chipSound from "./betting-chip-sound.mp3";
import { BettingChips } from "./BettingChips";
import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingControls.module.scss";

export const BettingControls = observer(() => {
  const { game, doubleBets, undoLastBet, betOnPlayer, betOnTie, betOnBanker } =
    useMainStore();
  const audio = useAudio(sound);
  const chipAudio = useAudio(chipSound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet && game.gameRound !== 0) {
      audio.play();
    }
  }, [game.gameStage]);

  const betOnThePlayer = () => {
    betOnPlayer(game.chosenBetValue);
    chipAudio.play();
  };
  const betOnTheTie = () => {
    betOnTie(game.chosenBetValue);
    chipAudio.play();
  };
  const betOnTheBank = () => {
    betOnBanker(game.chosenBetValue);
    chipAudio.play();
  };

  const handleDeal = () => {
    game.setGameStage(GameStage.InitialCards);
  };

  function allowDrop(ev: SyntheticEvent) {
    ev.preventDefault();
  }

  return (
    <>
      <div className={styles.bettingField}>
        <div
          className={styles.player}
          onDragOver={allowDrop}
          onDrop={betOnThePlayer}
        >
          PLAYER
        </div>
        <div className={styles.tie} onDragOver={allowDrop} onDrop={betOnTheTie}>
          TIE
        </div>
        <div
          className={styles.banker}
          onDragOver={allowDrop}
          onDrop={betOnTheBank}
        >
          BANKER
        </div>
      </div>
      <BettingChips />
      <button
        type="button"
        onClick={undoLastBet}
        disabled={game.gameStage !== GameStage.InitialBet}
      >
        Undo
      </button>
      <button
        type="button"
        onClick={handleDeal}
        disabled={
          game.gameStage !== GameStage.InitialBet || game.totalBet === 0
        }
      >
        Deal
      </button>
      <button
        type="button"
        onClick={doubleBets}
        disabled={game.gameStage !== GameStage.InitialBet}
      >
        x2
      </button>
    </>
  );
});
