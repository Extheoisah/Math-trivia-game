import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <h2>Math Trivia Game</h2>
      <Link to="/game-start">Game Start</Link>
      <Link to="/game-end">Game End</Link>
    </div>
  );
};

export default HomeComponent;
