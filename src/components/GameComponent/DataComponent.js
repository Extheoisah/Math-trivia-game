import { useRef} from 'react';

const DataComponent = ()=>{
    const question = useRef();
    const answer = useRef();


    const handlesubmit = (evt)=>{
        evt.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
            id:'35626',
            score: 34
        });
        
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://getpantry.cloud/apiv1/pantry/24fadf46-b66c-4a83-950f-6723cdce15a3/basket/mary", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    return(
        <div>
            <form action={handlesubmit} method="post">
            <input ref={question} type="text" />
            <input ref={answer} type="text" />
            <button onClick={handlesubmit}>Submit</button>
            </form>
        </div>
    );
}

export default DataComponent;