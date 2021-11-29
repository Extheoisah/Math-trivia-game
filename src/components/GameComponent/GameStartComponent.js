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

  const handleResponse = (response) => {

    switch (response.status) {
      case 400:
        console.log('failed attempt');
        dialogContent.current = {
          ...dialogState["startOpen"], closeListener: () => {
            navigate('/end');
          },
          argument: user
        };
        showDialog();
        break;

      case 200:
        console.log('user exit!')
        dialogContent.current = {
          ...dialogState["startExistingUser"], closeListener: () => {
            navigate('/end');
          },
          argument: user
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

    /*    {

      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        score: score.current,
        user: user
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    */

    fetch(`http://localhost:8000/api/scores/${user}`)
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


