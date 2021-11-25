import React, { useContext } from "react";
import TriviaContext from "../../context";
import ProgressBar from "../ProgressBar";
import LeaderBoard from "./LeaderBoard";
import ScoreComponent from "./ScoreComponent";


const GameEndComponent = () => {
  const { setGameState, score } = useContext(TriviaContext);
  const style = {
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    color: "white",
    fontFamily: "Lobster",
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "130px",
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: ".5rem 1rem",
    borderRadius: "4px",
  };

  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'center'}}>
      <ScoreComponent score={score}/>
      <div style={style}>
        <h2>Total score:</h2>
        <p>{score}</p>
      </div>
      <ProgressBar setTimer={()=>{}}/>
      <div>
      <LeaderBoard />
      </div>
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
