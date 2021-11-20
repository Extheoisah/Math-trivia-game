import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import TriviaContext from "../../context";

import './HomeComponent.css';

const HomeComponent = () => {
  const { setGameState } = useContext(TriviaContext);

  const handleClick = () => {
    let user = document.getElementById("username");
    if (!user.value) {
      alert('Please Enter a userName');
      return;
    }
    setGameState("start");

  }

  return (
    <div className='container'>
      <main>
        <p>Math Trivia</p>

        <div className="input-layout">
          <input type="text" name="" id="username" placeholder="Enter player name" maxLength={40} />
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
