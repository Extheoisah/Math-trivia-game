import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import CorrectButton from "../Buttons/CorrectButton";
import WrongButton from "../Buttons/WrongButton";
import QuestionComponent from "./QuestionComponent";
import ScoreComponent from "./ScoreComponent";
import TriviaContext from "../../context";
import './gameStart.css';
import ProgressBar from "../ProgressBar";
import { getQuestion } from "../../utils/questionUtils";
import { dialogState } from "../../utils/dialogUtil";


export const GameStartComponent = () => {
  const { score, user, showDialog, dialogContent, authenticated } = useContext(TriviaContext);
  const navigate = useNavigate();
  const time = useRef(100);
  const count = useRef(0);
  const animId = useRef(null);
  const question = useRef(getQuestion())
  let timerRef;
  let scoreRef;

  const incrementTime = (amt) => {

    time.current += amt;
    if (time.current > 100) time.current = 100;
    timerRef.current.style.width = `${time.current}%`;
  }

  const decrementTime = (amt) => {

    time.current -= amt;
    if (time.current <= 0) {
      endGame();
      return;
    }
    timerRef.current.style.width = `${time.current}%`;

  }

  let questionState;
  const getQuestionState = (s) => {
    questionState = s;
  }



  const answerHandler = (buttonValue) => {
    if (buttonValue === question.current[2]) {
      incrementTime(10);
      score.current++;
      scoreRef(score.current);
    } else {
      decrementTime(10);
    }

    question.current = getQuestion();
    questionState(question.current);

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

  const setTimer = (r) => {
    timerRef = r;
  }

  const setScoreRef = (r) => {
    scoreRef = r;
  }


 const updateScore = async ()=>{
  let params = {

    method: "PUT",
    body: JSON.stringify({
      score: score.current,
      user: user.current,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  let response = await fetch(`http://127.0.0.1:8000/api/scores/${user.current}/`, params)
  .then(resp=>resp)
  .catch(()=>{
    console.log('error');
    
  });

  if(response.status===200){
    navigate('/end');
  }else{
    console.log('error updating')
  }

 }

  const handleResponse = (response) => {

    if(authenticated.current===true){
      updateScore();
      return;
    }
    switch (response.status) {
      case 404:
      case 200:
        console.log('user exit!')
        dialogContent.current = {
          ...dialogState[response.status===404?"startOpen":"startExistingUser"], closeListener: () => {
            navigate('/end');
          },
          argument: user.current,
        };
        showDialog();
        break;
      default:
    }
  }


  useEffect(() => {
    score.current = 0;
    question.current = getQuestion();
    questionState(question.current);
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endGame = () => {
    console.log('end game called');
    cancelAnimationFrame(animId.current);

    fetch(`http://localhost:8000/api/scores/${user.current}`)
      .then(handleResponse)
      .catch(() => {
        console.log('error');
      });
  };




  return (
    <>
      <div className="game-start">
        {console.log("rendering home")
        }
        <ScoreComponent scoreRef={setScoreRef} />
        <QuestionComponent state={getQuestionState} />
        <ProgressBar setTimer={setTimer} />
        <div className="btn">
          <CorrectButton answerHandler={answerHandler} />
          <WrongButton answerHandler={answerHandler} />
        </div>
      </div>

    </>
  );
};

export default GameStartComponent;


