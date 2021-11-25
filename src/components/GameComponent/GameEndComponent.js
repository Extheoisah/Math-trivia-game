import React, { useContext, useEffect, useState } from "react";
import TriviaContext from "../../context";
import ProgressBar from "../ProgressBar";
import LeaderBoard from "./LeaderBoard";
import ScoreComponent from "./ScoreComponent";
import './gameEnd.css';
import { Link } from "react-router-dom";


const GameEndComponent = () => {
  const { setGameState, score, setScore } = useContext(TriviaContext);
  const [topPlayers, setTopPlayers] = useState(null)


  useEffect(()=>{
    fetch('https://getpantry.cloud/apiv1/pantry/24fadf46-b66c-4a83-950f-6723cdce15a3/basket/newBasket')
    .then(resp=>resp.json())
    .then(setTopPlayers)
    .catch(()=>console.log("error"))
    //.then(data=>console.log(data))
  }, []);

  const rePlay = ()=>{
    setScore(0);
    setGameState('start')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <ScoreComponent score={score} />
      <div className='score-board'>
        <h3>Total score:</h3>
        <p>{score}</p>
      </div>
      <ProgressBar setTimer={() => { }} />
      <div style={{ display: 'flex' }}>
        <LeaderBoard />
        <Link to='/start'  className='restart-icon' >
        <img onClick={rePlay} src="restartArrow.svg" alt="restart" />
        </Link>
      </div>
      <Link to='/'>
      <button>
        Home
      </button>
      </Link>

      <div>
        {topPlayers && <ul><li key={topPlayers.key}>{topPlayers.question}</li></ul>}
      </div>
    </div>
  );
};

export default GameEndComponent;
