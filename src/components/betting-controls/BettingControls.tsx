import React, { useEffect } from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import startSound from "../../sounds/place-bets-please.mp3";
import dealSound from "../../sounds/deal-sound.mp3";
import buttonClickSound from "../../sounds/button-click-sound.mp3";
import { BettingChips } from "./BettingChips";
import { useAudio } from "../../hooks/useAudio";

import styles from "./BettingControls.module.scss";
import { delay, playAudio } from "../../utils";
import { BettingField } from "./BettingField";

export const BettingControls = observer(() => {
  const { game, player, doubleBets, undoLastBet, sound, snapshots } =
    useMainStore();
  const [shouldSpin, setShouldSpin] = React.useState(false);
  const startAudio = useAudio(startSound);

  const dealAudio = useAudio(dealSound);
  const buttonClickAudio = useAudio(buttonClickSound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet) {
      playAudio(startAudio, +sound.soundVolume);
      setShouldSpin(false);
    }
  }, [game.gameStage]);

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
      <BettingField />
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
