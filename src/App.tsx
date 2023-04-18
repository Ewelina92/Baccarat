import React from "react";
import "./App.scss";
import { MainStoreContext, mainStore } from "./stores/mainStore";
import { GameSetup } from "./components/game-setup/GameSetup";

const App = () => (
  <MainStoreContext.Provider value={mainStore}>
    <div className="app">
      <GameSetup />
    </div>
  </MainStoreContext.Provider>
);

export default App;
