import React, { useContext, useEffect, useRef } from "react";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import { questions } from "../questions";
import TriviaContext from "../../context";
import './gameStart.css';
import ProgressBar from "../ProgressBar";

export const GameStartComponent = () => {
  const { setGameState, setScore, score } = useContext(TriviaContext);
  const time = useRef(100);
  const count = useRef(0);
  const animId = useRef(null);
  let timerRef;


  const incrementTime = (amt)=>{
    time.current +=amt;
    if(time.current>100)time.current=100;
    timerRef.current.style.width = `${time.current}%`;
  }

  const decrementTime = (amt)=>{
    time.current -=amt;
    if(time.current<=0){
      setGameState('end');
      return;
    }
    timerRef.current.style.width = `${time.current}%`;
    
  }


  const answerHandler = (isCorrectBtn) => {
    if(isCorrectBtn){
      if (questions[0].answer === "correct") {
        incrementTime(10);
        setScore((prev) => prev + 1);
      }
    }else{
      decrementTime(10);
    }
  };

  const play = () => {

    count.current++;
  
    if (count.current % 5 === 0) {
      count.current = 0;
      decrementTime(1);
    }


    if (time.current === 0) {
      cancelAnimationFrame(animId.current);
      return;
    }

    animId.current = requestAnimationFrame(play);
  }

  const setTimer =(r)=>{
    timerRef = r;
  }

  useEffect(() => {
    play();

    return () => {
      cancelAnimationFrame(animId.current);
    }
  }, []);

  return (
    <>
      <div className="game-start">
        <ScoreComponent score={score} />
        <QuestionComponent />
        <ProgressBar setTimer={setTimer}/>
        <div className="btn">
          <CorrectButton answerHandler={answerHandler} />
          <WrongButton answerHandler={answerHandler}/>
        </div>

      </div>
      <button
        onClick={() => {
          setGameState("end");
        }}
      >
        End Game
      </button>
      <div>Hello</div>

    </>
  );
};

export default GameStartComponent;


