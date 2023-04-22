import React from "react";
import { MainStoreContext, mainStore } from "./stores/mainStore";
import { GameSetup } from "./components/GameSetup";
import ErrorBoundary from "./ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <MainStoreContext.Provider value={mainStore}>
      <GameSetup />
    </MainStoreContext.Provider>
  </ErrorBoundary>
);

export default App;
