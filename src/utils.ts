import { shuffle } from "lodash";
import { Card, suits, cardFaces } from "./types";

// export const createCardDeck48Cards = (): Card[] => {
//   const cardDeck: Card[] = [];

//   for (const suit of suits) {
//     Object.entries(cardFaces).forEach(([face, value]) => {
//       const card = {
//         face,
//         suit,
//         value,
//         flipped: false
//       };
//       cardDeck.push(card);
//     });
//   }
//   return cardDeck;
// };

export const createCardDeck48Cards = (): Card[] => {
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
  createShuffledShoe(createShoe(numberOfCardDecks, createCardDeck48Cards()));

export const getPoints = (cards: Card[]): number => {
  let sum = 0;
  cards.forEach((card) => {
    sum += card.value;
  });

  return sum % 10;
};
// export const getPoints = (cards: Card[]): number => {
//   let sum = 0;
//   for (const card of cards) {
//     sum += card.value;
//   }
//   return sum % 10;
// };

export const checkWinner = (
  playerPoints: number,
  bankPoints: number
): string => {
  if (playerPoints === bankPoints) return "tie";
  if (playerPoints > bankPoints) return "player";
  return "bank";
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
