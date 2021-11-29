/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from 'react';
import TriviaContext from '../context';
import './dialog.css';


const welcomeMessage = () => {
  return (
    <>
      <p>Hi Dear! <br /> Welcome to this mini-version of <b>Math Trivia</b>.</p>
      <p>If you encounter any bug do well to contact the developers.</p>
      <p>Goto the links at the bottom.</p>
    </>
  )
};

const loginDetails = ()=>{
  return(
    <>
    <p>Get your friends to see your great score by registering as a user!</p>
    <form action={(evt)=>{evt.preventDefault()}} method="post">
      <input type="text" placeholder="Enter password" required/>
      <input type="submit" value="Submit" />
    </form>
  </>
  );
}

export const dialogState = {
  'home': {
    title: 'Welcome to Math Trivia',
    body: welcomeMessage
  },

  'startOpen': {
    title: 'Login Details',
    body: loginDetails
  },
}




export const Dialog = ({stateHandler}) => {
  const { dismissDialog, dialogContent } = useContext(TriviaContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>stateHandler(setIsVisible));

  const closeButtonClickHandler = ()=>{
    dismissDialog();
    if(dialogContent.current.hasOwnProperty('closeListener')){
      dialogContent.current.closeListener();
    }
  }

  return (
    <>
    {console.log('dialog', isVisible)
    }
      {
        isVisible && <div className='dialogContainer'>
          <h5>{dialogContent.current.title}</h5>
          <div className='body'>
            {dialogContent.current.body()}
          </div>
          <div className='closeBtn' onClick={closeButtonClickHandler}>Close</div>
        </div>
      }
    </>
  );
}