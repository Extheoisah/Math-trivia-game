export const updateScore = async(score, user) => {

    let params = {

        method: "PUT",
        body: JSON.stringify({
            score: score,
            user: user,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    let response = await fetch(`http://127.0.0.1:8000/api/scores/${user}/`, params)
        .then(resp => resp)
        .catch(() => {
            console.log('error');
        })

    return response;
}