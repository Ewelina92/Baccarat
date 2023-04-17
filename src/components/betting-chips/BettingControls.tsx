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

export const BettingControls = observer(() => {
  const {
    game,
    player,
    doubleBets,
    undoLastBet,
    betOnPlayer,
    betOnTie,
    betOnBanker,
    soundVolume,
    snapshots
  } = useMainStore();
  const [shouldSpin, setShouldSpin] = React.useState(false);
  const startAudio = useAudio(startSound, { volume: +soundVolume });
  const chipAudio = useAudio(chipSound, { volume: +soundVolume });
  const dealAudio = useAudio(dealSound, { volume: +soundVolume });
  const buttonClickAudio = useAudio(buttonClickSound, { volume: +soundVolume });

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet && game.gameRound !== 0) {
      startAudio.play();
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
    dealAudio.play();
    setShouldSpin(true);
    setTimeout(() => {
      game.setGameStage(GameStage.InitialCards);
    }, 500);
  };

  const handleUndoClick = () => {
    buttonClickAudio.play();
    undoLastBet();
  };

  const handleDoubleBetsClick = () => {
    buttonClickAudio.play();
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
        >
          <div className={styles.fieldInfo}>
            <p className={styles.name}>PLAYER</p>
            <p className={styles.stake}>1:1</p>
          </div>
          <p className={styles.bet}>&euro; {game.playerBet}</p>
        </div>
        <div className={styles.tie} onDragOver={allowDrop} onDrop={betOnTheTie}>
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
