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

    let response = await fetch(''.format(), params)
        .then(resp => resp)
        .catch(() => {
            console.log('error');
        })

    return response;
}

export const validateInput = (value, errorRef) => {

    if (!value) {
        //empty input
        errorRef.current.style.display = 'block';
        errorRef.current.lastChild.innerText = 'Please enter a name';
        return false;
    }

    let format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0-9]/;
    if (format.test(value.trim())) {
        errorRef.current.style.display = 'block';
        errorRef.current.lastChild.innerText = 'Only letters allowed';
        return false;
    }
    return true;
}