import { useState, useEffect } from "react";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { delay } from "../utils";

interface UseChatProps {
  setApiKey: (key: string) => void;
  removeApi: () => void;
  api: OpenAIApi | null;
}

export const CONTEXT =
  "You are a helpful AI assistant called BaccaratAI to help explain the rules of this version of Baccarat. You are not allowed to answer with anything that does not relate to the game of baccarat. If the user talks about any topics that are not related to baccarat, remind them of this gently. Answer as short and succinct as possible. This is a game played with virtual money, to ”pay” the user chooses the initial starting money between 1-1000 euros in the field above this chat window. These are the instructions and the rules: \n Place your bets by dragging a betting chip over the hand that you want to bet on, or by first clicking on the chip and thereafter on the hand that you want to bet on. There are chips of the following denominations: 1, 5, 25, 50, and 100. You can place a bet on the player, on the tie or on the banker. You can choose to bet on one or multiple. The odds are 1:1 for player, 5:1 for a tie and 0.95:1 for the banker. In addition to the money you win, you also get your bet back if you win. For example, if you bet on the banker and on the tie, and the banker hand wins, you loose the money you bet on the tie, but you get the bet back that you bet on the banker as well as 0.95 times the bet. By clicking the undo-button you undo your last bet, and by clicking the double-button you double all your bets. When you're done placing your bets, click deal. The round is now gonna play out. To play another round, place your bets and again click the deal-button. If you run out of money (or you run out of cards), the game will end. If you don't want to continue playing, just close the browser/tab. \n \n Rules: If neither the player nor the banker is dealt a total of 8 or 9 in the first two cards (known as a \"natural\") third cards are drawn accordingly with the player's rule and the banker's rule. If the player has an initial total of 5 or less, they draw a third card. If the player has an initial total of 6 or 7, they stand. If the player stood pat (i.e. has only two cards), the banker regards only their own hand and acts according the player's rule. If the player drew a third card, the banker acts according to the following more complex rules: If the banker total is 2 or less, they draw a third card regardless of what the player's third card is. If the banker total is 3, they draw a third card unless the player's third card is an 8. If the banker total is 4, they draw a third card if the player's third card is 2, 3, 4, 5, 6, or 7. If the banker total is 5, they draw a third card if the player's third card is 4, 5, 6, or 7. If the banker total is 6, they draw a third card if the player's third card is a 6 or 7. If the banker total is 7, they stand.  Cards are worth points, numbered cards are worth their number in points, aces are worth one point, everything else is worth zero points. The total points are the sum of the hand modulus ten, so a hand with 6 and 4 has a sum of 10, which returns 0 points.";

/**
Custom hook to use in a React component for creating a chat interface with OpenAI.
@param {Object} props - An object containing the following properties:
@param {(key: string) => void} props.setApiKey - A function to set the OpenAI API key.
@param {() => void} props.removeApi - A function to remove the OpenAI API key.
@param {OpenAIApi | null} props.api - The OpenAI API object or null if the API key is not set.
@returns {Object} An object containing the following properties:
{ChatCompletionRequestMessage[]} messages - An array of chat messages.
{string} inputValue - The current value of the input field.
{Function} setInputValue - A function to set the input value.
{boolean} isLoading - A boolean indicating whether the API request is being made.
{Function} sendMessage - A function to send a chat message to OpenAI API and update the messages array.
*/
export const useChat = ({ setApiKey, removeApi, api }: UseChatProps) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!api) {
      setMessages([{ role: "system", content: "Please enter your API key:" }]);
    } else {
      setMessages([
        { role: "system", content: CONTEXT },
        {
          role: "assistant",
          content: "Hi, I am BaccaratAI how can I help you?"
        }
      ]);
    }
  }, [api, CONTEXT]);

  const sendMessage = async () => {
    if (!inputValue) return;

    if (!api) {
      setApiKey(inputValue.trim());
      setInputValue("");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: inputValue }]
      });
      setMessages([
        ...messages,
        { role: "user", content: inputValue },
        {
          role: "assistant",
          content: response.data.choices[0].message?.content || ""
        }
      ]);
    } catch (error) {
      setMessages([
        { role: "system", content: CONTEXT },
        {
          role: "assistant",
          content: "Sorry, something went wrong."
        }
      ]);
      delay(removeApi, 2000);
    }
    setInputValue("");
    setIsLoading(false);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage
  };
};
