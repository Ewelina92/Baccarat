import React from "react";
import "./App.css";
import { MainStoreContext, mainStore } from "./stores/MainStore";
import { GameSetup } from "./components/GameSetup";

function App() {
  return (
    <MainStoreContext.Provider value={mainStore}>
      <div className="App">
        <GameSetup />
      </div>
    </MainStoreContext.Provider>
  );
}

export default App;
