import React from "react";
import "./App.scss";
import { MainStoreContext, mainStore } from "./stores/mainStore";
import { GameSetup } from "./components/game-setup/GameSetup";
import ErrorBoundary from "./ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <MainStoreContext.Provider value={mainStore}>
      <div className="app">
        <GameSetup />
      </div>
    </MainStoreContext.Provider>
  </ErrorBoundary>
);

export default App;
