
export default function LeaderBoard() {

    const style = {
        backgroundColor: "rgba(255, 255, 255, 0.13)",
        color: "white",
        fontFamily: "Lobster",
        fontSize: "1rem",
        width: "400px",
        height: "160px",
        marginTop: "1rem",
        padding: ".5rem 1rem",
        borderRadius: "4px",
        display: 'flex',
        flexFlow: 'column',
    };

    const testPlayers = ['Yinka', 'Grace', 'Tobi', 'Peter'];
    return (
        <div style={style}>
            <h5 style={{alignSelf:'center'}}>Leader Board</h5>
            <ol>
                {
                    testPlayers.map((x, index) => <li key={index}>{x} (100)</li>)
                }
            </ol>
        </div>
    );
}