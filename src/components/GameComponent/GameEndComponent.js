import React, { useContext } from "react";
import TriviaContext from "../../context";

const GameEndComponent = () => {
  const { setGameState } = useContext(TriviaContext);

  return (
    <div>
      <button
        onClick={() => {
          setGameState("home");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default GameEndComponent;
