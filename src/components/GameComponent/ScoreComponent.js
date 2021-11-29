import {useRef, useEffect, useContext, useState} from 'react';
import TriviaContext from '../../context';



const ScoreComponent = ({ scoreRef }) => {
  const divStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "fit-content",
    fontFamily: "Lobster",
  };

  const ref = useRef();
  const {score} = useContext(TriviaContext);
  const [gameScore, setScore] = useState(0);


  useEffect(()=>{
    scoreRef(setScore);
    console.log('score effect called');
    
  },[]);

  return (
    <div style={divStyles}>
      {console.log('score rendered')
      }
      <h2
        style={{
          color: "#3EDA73",
          fontWeight: "400",
        }}
      >
        Score
      </h2>
      <p
        style={{
          color: "#fff",
          fontSize: "1.5rem",
        }}

        ref={ref}
      >
        {gameScore}
      </p>
    </div>
  );
};

export default ScoreComponent;
