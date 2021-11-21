import React, { useContext, useEffect } from "react";
import { FaExclamationCircle, FaPlay } from "react-icons/fa";
import TriviaContext from "../../context";

import './HomeComponent.css';

const HomeComponent = () => {
  const { setGameState } = useContext(TriviaContext);

  const handleClick = () => {
    let user = document.getElementById("username");
    if (!user.value) {
      document.getElementById('error').style.display='block';
      return;
    }
    setGameState("start");
  }
  

  useEffect(() => {
    document.getElementById('logo').style.left = '0px';
  }, [])


  return (
    <div className='container'>
      <main>
        <p id='logo'>Math Trivia</p>

        <div className="input-layout error">
          <input type="text" name="" id="username" placeholder="Enter player name" maxLength={40} />
          <div id="error"><FaExclamationCircle color='var(--red)'/><p>Please enter name</p></div>
        </div>

          <div className='play-layout' onClick={handleClick}>
            <p>Play</p>
            <p><FaPlay color='var(--green)' /></p>
          </div>
        

      </main>

    </div>
  );
};

export default HomeComponent;
