import React, { useState, useContext, useEffect } from "react";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import { questions } from "../questions";
import TriviaContext from "../../context";
import './gameStart.css';
import ProgressBar from "../ProgressBar";

export const GameStartComponent = () => {
  const { setGameState } = useContext(TriviaContext);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(100);

  const answerHandler = () => {
    if (questions[0].answer === "correct") {
      setScore((prevScore) => prevScore + 1);
    }
  };

  useEffect(() => {
    const decr = setInterval(()=>{
      setTime(time=>time-2);
    },500);

    return ()=>{
      clearInterval(decr);
      setTime(time+10);
    }
  }, [score]);

  return (
    <>
      <div className="game-start">
        <ScoreComponent score={score} />
        <QuestionComponent />
        <ProgressBar time={time}/>
        <div className="btn">
          <CorrectButton answerHandler={answerHandler} />
          <WrongButton />
        </div>
      
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


// const [currentQuestion, seCurrentQuestion] = useState({});
//     const [score, setScore] = useState(0);
// <main className="game">

// {/* Score layout */}
// <div className='score'>
//     <p>Score</p>
//     <p>{score}</p>
// </div>
// {Question(currentQuestion)}

//     {ProgressBar(timer.time)}

// <div className='option-layout'>
//     {Option('right')}
//     {Option('wrong')}
// </div>
// </main>


