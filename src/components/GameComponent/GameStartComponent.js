import React from "react";
import { Link } from "react-router-dom";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";

export const GameStartComponent = () => {
  return (
    <>
      <div className="game-start">
        <ScoreComponent />
        <QuestionComponent />
        <div className="time-bar"></div>
        <div className="btn">
          <CorrectButton />
          <WrongButton />
        </div>
        <p className="author">(c) 2021, Theophilus & Saturday.</p>
      </div>
      <Link to="/"> Press to go to Home Component</Link>
    </>
  );
};

export default GameStartComponent;
