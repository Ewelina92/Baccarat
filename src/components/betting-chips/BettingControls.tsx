import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import sound from "./place-bets-please.mp3";
import chipSound from "./betting-chip-sound.mp3";
import { BettingChips } from "./BettingChips";
import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingControls.module.scss";

export const BettingControls = observer(() => {
  const {
    game,
    doubleBets,
    undoLastBet,
    betOnPlayer,
    betOnTie,
    betOnBanker,
    snapshots
  } = useMainStore();
  const [shouldSpin, setShouldSpin] = React.useState(false);
  const audio = useAudio(sound);
  const chipAudio = useAudio(chipSound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet && game.gameRound !== 0) {
      audio.play();
      setShouldSpin(false);
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
    setShouldSpin(true);
    setTimeout(() => {
      game.setGameStage(GameStage.InitialCards);
    }, 500);
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
          <div className={styles.fieldInfo}>
            <p className={styles.name}>PLAYER</p>
            <p className={styles.stake}>1:1</p>
          </div>
          <p className={styles.bet}>Bet: {game.playerBet}</p>
        </div>
        <div className={styles.tie} onDragOver={allowDrop} onDrop={betOnTheTie}>
          <div className={styles.fieldInfo}>
            <p className={styles.name}>TIE</p>
            <p className={styles.stake}>5:1</p>
          </div>
          <p>Bet: {game.tieBet}</p>
        </div>
        <div
          className={styles.banker}
          onDragOver={allowDrop}
          onDrop={betOnTheBank}
        >
          <div className={styles.fieldInfo}>
            <p className={styles.name}>BANKER</p>
            <p className={styles.stake}>0.95:1</p>
          </div>
          <p>Bet: {game.bankerBet}</p>
        </div>
      </div>
      <BettingChips />
      <div className={styles.controls}>
        <button
          className={cn(styles.btn, styles.small)}
          type="button"
          onClick={undoLastBet}
          disabled={
            game.gameStage !== GameStage.InitialBet || snapshots.length < 2
          }
        >
          <span className={styles.inside}>&#8634;</span>
        </button>

        <button
          className={cn(styles.btn, styles.big, { [styles.spin]: shouldSpin })}
          type="button"
          onClick={handleDeal}
          disabled={
            game.gameStage !== GameStage.InitialBet || game.totalBet === 0
          }
        >
          <span className={styles.inside}>
            <span className={styles.innermost}>Deal</span>
          </span>
        </button>
        <button
          className={cn(styles.btn, styles.small)}
          type="button"
          onClick={doubleBets}
          disabled={
            game.gameStage !== GameStage.InitialBet || game.totalBet === 0
          }
        >
          <span className={styles.inside}>x2</span>
        </button>
      </div>
    </>
  );
});
