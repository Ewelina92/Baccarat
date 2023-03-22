import React from "react";
import { BaccaratStore, MainStoreContext } from "../stores/MainStore";

export const useMainStore = (): BaccaratStore => {
  const context = React.useContext(MainStoreContext);
  if (!context) {
    throw new Error("whoops, empty context");
  }

  return context;
};
