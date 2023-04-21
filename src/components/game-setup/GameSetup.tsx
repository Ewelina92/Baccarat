import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../hooks/useMainStore";
import { GameField } from "../game/GameField";
import { StartOverlay } from "../overlays/StartOverlay";
import { GameStage } from "../../stores/gameStore";
import { preloadImage } from "../../utils";

const imageNameFirstPart = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "A",
  "J",
  "K",
  "Q"
];
const imageNameSecondPart = ["C", "D", "H", "S"];

const preloadAllImages = () => {
  preloadImage("../cards/img/back.svg");

  imageNameFirstPart.forEach((part1) => {
    imageNameSecondPart.forEach((part2) => {
      preloadImage(`../cards/img/${part1}${part2}.svg`);
    });
  });
};

export const GameSetup = observer(() => {
  // preload images to prevent flickering
  useEffect(() => {
    preloadAllImages();
  }, []);

  const { game } = useMainStore();

  return (
    <>
      <GameField />
      {game.gameStage === GameStage.Start && <StartOverlay />}
    </>
  );
});
