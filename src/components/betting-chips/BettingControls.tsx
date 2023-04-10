import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameStage } from "../../stores/gameStore";
import { BettingChip, BettingChipsValues, BetOnOptions } from "./BettingChip";
import sound from "./place-bets-please.mp3";

const bettingChipValues: BettingChipsValues[] = [1, 5, 25, 50, 100];

export const BettingControls = observer(() => {
  const { game, doubleBets } = useMainStore();
  const [bettingChoice, setBettingChoice] = React.useState("");
  const audio = new Audio(sound);

  useEffect(() => {
    if (game.gameStage === GameStage.InitialBet && game.gameRound !== 0) {
      audio.play();
    }
  }, [game.gameStage]);

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBettingChoice(e.target.value);
  };

  const handleDeal = () => {
    game.setGameStage(GameStage.InitialCards);
  };

  return (
    <>
      {bettingChipValues.map((value) => (
        <BettingChip
          key={value}
          value={value}
          betOn={bettingChoice as BetOnOptions}
        />
      ))}
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
      <fieldset>
        <legend>What do you want to bet on?</legend>

        <div>
          <label htmlFor="player">
            <input
              type="radio"
              id="player"
              name="bettingChoice"
              value="player"
              onChange={onOptionChange}
            />
            Player
          </label>
        </div>

        <div>
          <label htmlFor="tie">
            <input
              type="radio"
              id="tie"
              name="bettingChoice"
              value="tie"
              onChange={onOptionChange}
            />
            Tie
          </label>
        </div>

        <div>
          <label htmlFor="bank">
            <input
              type="radio"
              id="bank"
              name="bettingChoice"
              value="bank"
              onChange={onOptionChange}
            />
            Bank
          </label>
        </div>
      </fieldset>
    </>
  );
});
