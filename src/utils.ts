import { shuffle } from "lodash";
import { Card, suits, cardFaces, HandOptions } from "./types";

/**
Creates a standard deck of 52 playing cards.
@returns {Card[]} An array of Card objects representing the 52-card deck.
*/
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

/**
Creates an array of cards by concatenating a specified number of card decks.
@param {number} numberOfCardDecks - The number of card decks to concatenate.
@param {Card[]} cardDeck - An array of cards to concatenate.
@returns {Card[]} An array of cards, created by concatenating numberOfCardDecks copies of cardDeck.
*/
export const createShoe = (
  numberOfCardDecks: number,
  cardDeck: Card[]
): Card[] => Array(numberOfCardDecks).fill(cardDeck).flat();

/**
Creates a shuffled shoe of cards.
@param {Card[]} cards - An array of cards to be shuffled.
@returns {Card[]} - An array of shuffled cards.
*/
export const createShuffledShoe = (cards: Card[]): Card[] => shuffle(cards);

/**
Generates a shuffled card shoe consisting of multiple decks of standard 52 playing cards.
@param {number} numberOfCardDecks - The number of decks to include in the shoe.
@returns {Card[]} - An array of Card objects representing the shuffled shoe.
*/
export const getShuffledShoe = (numberOfCardDecks: number): Card[] =>
  createShuffledShoe(createShoe(numberOfCardDecks, createCardDeck52Cards()));

/**
Calculates the point value of an array of cards in a baccarat game.
@param {Card[]} cards - An array of Card objects representing the cards to calculate the point value for.
@returns {number} The point value of the given cards in a baccarat game.
*/
export const getPoints = (cards: Card[]): number => {
  let sum = 0;
  cards.forEach((card) => {
    sum += card.value;
  });

  return sum % 10;
};

/**
Determines the winner based on the player and bank points.
@param {number} playerPoints - The total number of points the player has.
@param {number} bankPoints - The total number of points the bank has.
@returns {HandOptions} - The winner of the game based on the points.
*/
export const checkWinner = (
  playerPoints: number,
  bankPoints: number
): HandOptions => {
  if (playerPoints === bankPoints) return HandOptions.Tie;
  if (playerPoints > bankPoints) return HandOptions.Player;
  return HandOptions.Banker;
};

/**
Determines whether a third card needs to be drawn based on the current points.
@param {number} points - The current points.
@returns {boolean} Returns a boolean indicating if the third card needs to be drawn or not.
*/
export const needThirdCardPlayerRule = (points: number): boolean => {
  if (points <= 5) return true;
  return false;
};

/**
Determines whether the banker needs to draw a third card based on the player's third card and the current total points.
@param {number} points - The current total points.
@param {string} playerThirdCardFace - The face value of the player's third card.
@returns {boolean} - True if the banker needs to draw a third card, false otherwise.
*/
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

/**
Delays the execution of a given function by a specified amount of time.
@param {Function} fn - The function to be executed after the delay.
@param {number} time - The delay time in milliseconds.
*/
export const delay = (fn: () => void, time: number): void => {
  const timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, time);
};

/**
Plays an HTML audio element if the volume is on (1).
@param {HTMLAudioElement} audio - The HTML audio element to be played.
@param {number} volume - The volume level of the audio element (between 0 and 1).
*/
export const playAudio = (audio: HTMLAudioElement, volume: number): void => {
  if (volume === 1) {
    audio.play();
  }
};

/**
Takes a time value in seconds and formats it into a string representation of hours, minutes, and seconds.
@param {number} time - The time value in seconds to format.
@returns {string} The formatted time string in the format of 'hh:mm:ss'.
*/
export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;

  const hoursAsString = hours.toString().padStart(2, "0");
  const minutesAsString = minutes.toString().padStart(2, "0");
  const secondsAsString = seconds.toString().padStart(2, "0");

  return `${hoursAsString}:${minutesAsString}:${secondsAsString}`;
};
