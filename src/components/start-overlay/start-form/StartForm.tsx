import React from "react";
import { observer } from "mobx-react";
import { useMainStore } from "../../../hooks/useMainStore";
import styles from "./StartForm.module.scss";

export const StartForm = observer(() => {
  const { startGame } = useMainStore();
  const [money, setMoney] = React.useState(0);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");

  const handleMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(event.target.valueAsNumber);
  };

  const handleStartGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (money > 0 && money <= 1000) {
      startGame(money);
    } else {
      setFormErrorMessage("Please add starting amount to begin.");
    }
  };

  return (
    <form onSubmit={handleStartGame}>
      {formErrorMessage}
      <div className={styles.formentry}>
        <label htmlFor="money">
          Starting balance:{" "}
          <span className={styles.balance}>(&euro;1-1000)</span>
          <input
            id="money"
            type="number"
            min={1}
            max={1000}
            onChange={handleMoney}
            placeholder="&euro; 0"
          />
        </label>
      </div>
      <button type="submit">PLAY</button>
    </form>
  );
});
