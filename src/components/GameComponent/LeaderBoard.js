import { useEffect, useState } from 'react';
import './leaderBoard.css';


export default function LeaderBoard() {

  const [topPlayers, setTopPlayers] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/api/scores/")
      .then(resp => resp.json())
      .then(setTopPlayers)
      .catch(() => { });
  }, []);

  return (
    <>
      <h4>Leader Board</h4>
      <div className='leader-board'>
        <ol>
          {
            topPlayers && [...topPlayers,...topPlayers].map((x, index) => <li key={index}>{x.user} ({x.score})</li>)
          }
        </ol>
      </div>
    </>
  );
}