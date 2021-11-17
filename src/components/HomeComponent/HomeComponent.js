import React, { useContext } from "react";
import TriviaContext from "../../context";

const HomeComponent = () => {
  const { setGameState } = useContext(TriviaContext);
  return (
    <div>
      <h2>Math Trivia Game</h2>
      <button
        onClick={() => {
          setGameState("start");
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default HomeComponent;
