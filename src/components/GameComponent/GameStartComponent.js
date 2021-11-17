import React, { useState, useContext } from "react";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import { questions } from "../questions";
import TriviaContext from "../../context";

export const GameStartComponent = () => {
  const { setGameState } = useContext(TriviaContext);
  const [score, setScore] = useState(0);

  const answerHandler = () => {
    if (questions[0].answer === "correct") {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <>
      <div className="game-start">
        <ScoreComponent score={score} />
        <QuestionComponent />
        <div className="time-bar"></div>
        <div className="btn">
          <CorrectButton answerHandler={answerHandler} />
          <WrongButton />
        </div>
        <p className="author">(c) 2021, Theophilus & Saturday.</p>
      </div>
      <button
        onClick={() => {
          setGameState("end");
        }}
      >
        End Game
      </button>
    </>
  );
};

export default GameStartComponent;
