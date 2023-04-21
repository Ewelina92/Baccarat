/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import startSound from "../../sounds/place-bets-please.mp3";
import dealSound from "../../sounds/deal-sound.mp3";
import chipSound from "../../sounds/betting-chip-sound.mp3";
import buttonClickSound from "../../sounds/button-click-sound.mp3";
import { BettingChips } from "./BettingChips";
import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingControls.module.scss";
import { delay, playAudio } from "../../utils";

export const BettingControls = observer(() => {
  const {
    game,
    player,
    doubleBets,
    undoLastBet,
    betOnPlayer,
    betOnTie,
    betOnBanker,
    sound,
    snapshots
  } = useMainStore();
  const [shouldSpin, setShouldSpin] = React.useState(false);
  const startAudio = useAudio(startSound);
  const chipAudio = useAudio(chipSound);
  const dealAudio = useAudio(dealSound);
  const buttonClickAudio = useAudio(buttonClickSound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet) {
      playAudio(startAudio, +sound.soundVolume);
      setShouldSpin(false);
    }
  }, [game.gameStage]);

  const betOnThePlayer = () => {
    if (game.chosenBetValue > 0) {
      betOnPlayer(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };
  const betOnTheTie = () => {
    if (game.chosenBetValue > 0) {
      betOnTie(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };
  const betOnTheBank = () => {
    if (game.chosenBetValue > 0) {
      betOnBanker(game.chosenBetValue);
      playAudio(chipAudio, +sound.soundVolume);
    }
  };

  const handleDeal = () => {
    playAudio(dealAudio, +sound.soundVolume);
    setShouldSpin(true);
    delay(() => {
      game.setGameStage(GameStage.InitialCards);
    }, 500);
  };

  const handleUndoClick = () => {
    playAudio(buttonClickAudio, +sound.soundVolume);
    undoLastBet();
  };

  const handleDoubleBetsClick = () => {
    playAudio(buttonClickAudio, +sound.soundVolume);
    doubleBets();
  };

  function allowDrop(ev: SyntheticEvent) {
    ev.preventDefault();
  }

  const disableDoubleBetButton =
    game.gameStage !== GameStage.InitialBet ||
    game.totalBet === 0 ||
    player.playerMoney < game.totalBet;

  const disableUndoButton =
    game.gameStage !== GameStage.InitialBet || snapshots.length < 2;

  const disableDealButton =
    game.gameStage !== GameStage.InitialBet || game.totalBet === 0;

  return (
    <>
      <div className={styles.bettingField}>
        <div
          className={styles.player}
          onDragOver={allowDrop}
          onDrop={betOnThePlayer}
          onClick={betOnThePlayer}
        >
          <div className={styles.fieldInfo}>
            <p className={styles.name}>PLAYER</p>
            <p className={styles.stake}>1:1</p>
          </div>
          <p className={styles.bet}>&euro; {game.playerBet}</p>
        </div>
        <div
          className={styles.tie}
          onDragOver={allowDrop}
          onDrop={betOnTheTie}
          onClick={betOnTheTie}
        >
          <div className={styles.fieldInfo}>
            <p className={styles.name}>TIE</p>
            <p className={styles.stake}>5:1</p>
          </div>
          <p>&euro; {game.tieBet}</p>
        </div>
        <div
          className={styles.banker}
          onDragOver={allowDrop}
          onDrop={betOnTheBank}
          onClick={betOnTheBank}
        >
          <div className={styles.fieldInfo}>
            <p className={styles.name}>BANKER</p>
            <p className={styles.stake}>0.95:1</p>
          </div>
          <p>&euro; {game.bankerBet}</p>
        </div>
      </div>
      <BettingChips />
      <div className={styles.controls}>
        <button
          className={cn(styles.btn, styles.small)}
          type="button"
          onClick={handleUndoClick}
          disabled={disableUndoButton}
        >
          <span className={styles.inside}>&#8634;</span>
        </button>

        <button
          className={cn(styles.btn, styles.big, { [styles.spin]: shouldSpin })}
          type="button"
          onClick={handleDeal}
          disabled={disableDealButton}
        >
          <span className={styles.inside}>
            <span className={styles.innermost}>Deal</span>
          </span>
        </button>
        <button
          className={cn(styles.btn, styles.small)}
          type="button"
          onClick={handleDoubleBetsClick}
          disabled={disableDoubleBetButton}
        >
          <span className={styles.inside}>x2</span>
        </button>
      </div>
    </>
  );
});
