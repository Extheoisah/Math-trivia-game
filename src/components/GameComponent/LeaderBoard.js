import { useEffect, useState } from 'react';
import { urls } from '../../utils/api';
import './leaderBoard.css';


export default function LeaderBoard() {

  const [topPlayers, setTopPlayers] = useState(null)

  useEffect(() => {
    fetch(urls.scoresBase)
      .then(resp => resp.json())
      .then(setTopPlayers)
      .catch(() => { });
  }, []);

  return (
    <>
      <h4>Leader Board</h4>

      <div className='leader-board'>
      {
        !topPlayers && <div className='loader' style={{ position: 'relative' }}></div>
      }
        <ol>
          {
            topPlayers && topPlayers.map((x, index) => <li key={index}>{x.user} ({x.score})</li>)
          }
        </ol>
      </div>
    </>
  );
}