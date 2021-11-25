import './leaderBoard.css';


export default function LeaderBoard() {

    const testPlayers = ['Yinka', 'Grace', 'Tobi', 'Peter','Yinka', 'Grace', 'Tobi', 'Peter'];
    return (
        <div className='leader-board'>
            <h5>Leader Board</h5>
            <ol>
                {
                    testPlayers.map((x, index) => <li key={index}>{x} (100)</li>)
                }
            </ol>
        </div>
    );
}