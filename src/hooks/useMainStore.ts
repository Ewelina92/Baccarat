import React from "react";
import { MainStore, MainStoreContext } from "../stores/mainStore";

export const useMainStore = (): MainStore => {
  const context = React.useContext(MainStoreContext);
  if (!context) {
    throw new Error("whoops, empty context");
  }

  return context;
};
