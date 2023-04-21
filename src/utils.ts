import { shuffle } from "lodash";
import { Card, suits, cardFaces, HandOptions } from "./types";

export const createCardDeck52Cards = (): Card[] => {
  const cardDeck: Card[] = [];

  suits.forEach((suit) => {
    Object.entries(cardFaces).forEach(([face, value]) => {
      const card = {
        face,
        suit,
        value,
        flipped: false
      };
      cardDeck.push(card);
    });
  });
  return cardDeck;
};

export const createShoe = (
  numberOfCardDecks: number,
  cardDeck: Card[]
): Card[] => Array(numberOfCardDecks).fill(cardDeck).flat();

export const createShuffledShoe = (cards: Card[]): Card[] => shuffle(cards);

export const getShuffledShoe = (numberOfCardDecks: number): Card[] =>
  createShuffledShoe(createShoe(numberOfCardDecks, createCardDeck52Cards()));

export const getPoints = (cards: Card[]): number => {
  let sum = 0;
  cards.forEach((card) => {
    sum += card.value;
  });

  return sum % 10;
};

export const checkWinner = (
  playerPoints: number,
  bankPoints: number
): HandOptions => {
  if (playerPoints === bankPoints) return HandOptions.Tie;
  if (playerPoints > bankPoints) return HandOptions.Player;
  return HandOptions.Banker;
};

export const needThirdCardPlayerRule = (points: number): boolean => {
  if (points <= 5) return true;
  return false;
};

export const needThirdCardBankersRule = (
  points: number,
  playerThirdCardFace: string
): boolean => {
  switch (points) {
    case 0:
    case 1:
    case 2:
      return true;
    case 3:
      if (playerThirdCardFace === "8") return false;
      return true;
    case 4:
      if (
        playerThirdCardFace === "2" ||
        playerThirdCardFace === "3" ||
        playerThirdCardFace === "4" ||
        playerThirdCardFace === "5" ||
        playerThirdCardFace === "6" ||
        playerThirdCardFace === "7"
      )
        return true;
      return false;
    case 5:
      if (
        playerThirdCardFace === "4" ||
        playerThirdCardFace === "5" ||
        playerThirdCardFace === "6" ||
        playerThirdCardFace === "7"
      )
        return true;
      return false;
    case 6:
      if (playerThirdCardFace === "6" || playerThirdCardFace === "7")
        return true;
      return false;
    default:
      return false;
  }
};

export const delay = (fn: () => void, time: number) => {
  const timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, time);
};

export const preloadImage = (img_url: string) => {
  const img = new Image();
  img.src = img_url;
  return img;
};

export function preloadSVG(url: string) {
  new Image().src = url;
}

export function preloadSVGs(svgContext: __WebpackModuleApi.RequireContext) {
  svgContext.keys().forEach((key) => {
    preloadSVG(svgContext(key));
  });
}
