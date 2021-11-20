import { useState } from "react";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import GameStartComponent from "./components/GameComponent/GameStartComponent";
import GameEndComponent from "./components/GameComponent/GameEndComponent";
import "./App.css";

import TriviaContext from "./context";

function App() {
  const [gameState, setGameState] = useState("home");
  return (

    <div className="App">
      <TriviaContext.Provider value={{ gameState, setGameState }}>
        {gameState === "home" && <HomeComponent />}
        {gameState === "start" && <GameStartComponent />}
        {gameState === "end" && <GameEndComponent />}
      </TriviaContext.Provider>

      <footer>
        <p>&copy; Theophilus &amp; Baribor, 2021.</p>
      </footer>
    </div>
    
  );
}

export default App;
