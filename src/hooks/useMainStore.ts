import React from "react";
import { MainStore, MainStoreContext } from "../stores/mainStore";

/**
A custom hook that provides access to the MainStore context.
@function useMainStore
@returns {MainStore} The MainStore context object
@throws {Error} Throws an error if the MainStore context is not available.
*/
export const useMainStore = (): MainStore => {
  const context = React.useContext(MainStoreContext);
  if (!context) {
    throw new Error("whoops, empty context");
  }

  return context;
};
