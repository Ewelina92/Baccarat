import React, { useEffect, useRef } from "react";
import { useOpenAI } from "../../../hooks/useOpenAI";
import styles from "./Chat.module.scss";
import { useChat } from "../../../hooks/useChat";

export const Chat = () => {
  const { api, setApiKey, removeApi } = useOpenAI();
  const { messages, inputValue, setInputValue, isLoading, sendMessage } =
    useChat({
      setApiKey,
      removeApi,
      api
    });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [isLoading, messages]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const loadingAnimation = (
    <div className={styles["lds-ellipsis"]}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  return (
    <div className={styles.container}>
      {messages.length > 1 && (
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
          {isLoading && loadingAnimation}
        </div>
      )}
      <div className={styles.form}>
        <input
          type="text"
          placeholder={!api ? "Enter OpenAI API Key" : "Type your message"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={isLoading}
        />
        <button type="button" onClick={sendMessage} disabled={isLoading}>
          {!api ? "Set OpenAI API Key" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
