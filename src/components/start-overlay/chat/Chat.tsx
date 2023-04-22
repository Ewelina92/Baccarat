import React, { useState, useEffect, useRef } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { useOpenAI } from "./useOpenAI";
import styles from "./Chat.module.scss";

const CONTEXT =
  "You are a helpful AI assistant called BaccaratAI to help explain the rules of this version of Baccarat. You are not allowed to answer with anything that does not relate to the game of baccarat. If the user talks about any topics that are not related to baccarat, remind them of this gently. Answer as short and succinct as possible. These are the instructions and the rules: Place your bets by dragging a betting chip over the hand that you want to bet on, or by first clicking on the chip and thereafter on the hand that you want to bet on. By clicking the undo-button you undo your last bet, and by clicking the double-button you double all your bets. When you're done placing your bets, click deal. The round is now gonna play out. To play another round, place your bets and again click the deal-button. If you run out of money (or you run out of cards), the game will end. If you don't want to continue playing, just close the browser/tab. \n \n Rules: If neither the player nor the banker is dealt a total of 8 or 9 in the first two cards (known as a \"natural\") third cards are drawn accordingly with the player's rule and the banker's rule. If the player has an initial total of 5 or less, they draw a third card. If the player has an initial total of 6 or 7, they stand. If the player stood pat (i.e. has only two cards), the banker regards only their own hand and acts according the player's rule. If the player drew a third card, the banker acts according to the following more complex rules: If the banker total is 2 or less, they draw a third card regardless of what the player's third card is. If the banker total is 3, they draw a third card unless the player's third card is an 8. If the banker total is 4, they draw a third card if the player's third card is 2, 3, 4, 5, 6, or 7. If the banker total is 5, they draw a third card if the player's third card is 4, 5, 6, or 7. If the banker total is 6, they draw a third card if the player's third card is a 6 or 7. If the banker total is 7, they stand.";

export const OpenAIChat: React.FC = () => {
  const { api, setApiKey } = useOpenAI();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

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
  }, [api]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue) return;

    if (!api) {
      setApiKey(inputValue.trim());
      setInputValue("");
      return;
    }

    const response = await api.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, { role: "user", content: inputValue }]
    });

    setInputValue("");
    setMessages([
      ...messages,
      { role: "user", content: inputValue },
      {
        role: "assistant",
        content: response.data.choices[0].message?.content || ""
      }
    ]);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {!!api && (
        <div className={styles.chat} ref={chatRef}>
          {messages.slice(1).map((message, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`chat-message-${index}`}
              className={`${styles.message} ${
                styles[`${message.role}Message`]
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      )}
      <div className={styles.form}>
        <input
          type="text"
          placeholder={!api ? "Enter API Key" : "Type your message"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button type="button" onClick={sendMessage}>
          {!api ? "Set API Key" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default OpenAIChat;
