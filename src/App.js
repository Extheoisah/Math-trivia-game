import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import GameStartComponent from "./components/GameComponent/GameStartComponent";
import GameEndComponent from "./components/GameComponent/GameEndComponent";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomeComponent />} />

          <Route path="/game-start" element={<GameStartComponent />} />

          <Route path="/game-end" element={<GameEndComponent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
