/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import TriviaContext from '../context';
import './dialog.css';

const showLoading = (ref, setter) => {
  ref.current.style.filter = 'blur(5px)';
  ref.current.style.pointerEvents = 'none';
  setter(true);
}

const dismissLoading = (ref, setter) => {
  ref.current.style.filter = 'blur(0px)';
  ref.current.style.pointerEvents = 'all';
  setter(false);
}


const welcomeMessage = () => {
  return (
    <>
      <p>Hi Dear! <br /> Welcome to this mini-version of <b>Math Trivia</b>.</p>
      <p>If you encounter any bug do well to contact the developers.</p>
      <p>Goto the links at the bottom.</p>
    </>
  )
};

const existingUserDialog = (user) => {

  const Body = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const passwordRef = useRef();
    const dialogBodyRef = useRef();
    const { dismissDialog, authenticated } = useContext(TriviaContext);

    

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      showLoading(dialogBodyRef,setLoading);

      let password = passwordRef.current.value;

      let response = await fetch(`http://localhost:8000/api/auth/?user=${user}&password=${password}`)
        .then(response => response)
        .catch(() => {
          console.log('error');
        });

      dismissLoading(dialogBodyRef,setLoading);
      if (response.status === 404) {
        console.log('invalid password');
      } else {
        console.log('valid password');
        authenticated.current = true;
        dismissDialog();
        navigate('/end');
      }

    }

    return (
      <>
        <div ref={dialogBodyRef}>
          <p>Welcome back {user}</p>
          <p>Enter your password to login.</p>
          <form method="post" onSubmit={handleSubmit} className='input-layout'>
            <input ref={passwordRef} type="text" placeholder="Enter password" required style={{ marginTop: '5px' }} />
            <input type="submit" value="Submit" className='button bg-success' />
            <p style={{ fontSize: '.9em' }}>If this is not you <span style={{ color: 'var(--green)', fontWeight: '700', cursor: 'pointer' }}>Create an account</span></p>
          </form>
        </div>
        {
          loading && <div class="loader"></div>
        }
      </>
    );
  }

  return <Body />;
}

const loginDetails = (user) => {

  

  const Body = ()=>{

    const handleSubmit = (evt) => {
      evt.preventDefault();
      console.log("submitting");


  
    }

    return (
      <>
        <p>Great score! {user}</p>
        <p>Get your friends to see your score by registering as a user!</p>
        <form method="post" onSubmit={handleSubmit} className='input-layout'>
          <input type="text" placeholder="Enter password" required style={{ marginTop: '5px' }} />
          <input type="submit" value="Submit" className='button bg-success' />
        </form>
      </>
    );
  }

  return <Body />
  
};


export const dialogState = {
  'home': {
    title: 'Welcome to Math Trivia',
    body: welcomeMessage
  },

  'startOpen': {
    title: 'Login Details',
    body: loginDetails
  },

  'startExistingUser': {
    title: 'Login Details',
    body: existingUserDialog
  }
}




export const Dialog = ({ stateHandler }) => {
  const { dismissDialog, dialogContent } = useContext(TriviaContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => stateHandler(setIsVisible));

  const closeButtonClickHandler = () => {
    dismissDialog();
    if (dialogContent.current.hasOwnProperty('closeListener')) {
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
            {
              dialogContent.current.hasOwnProperty('argument') ? dialogContent.current.body(dialogContent.current.argument) : dialogContent.current.body()
            }
          </div>
          <div className='closeBtn button' onClick={closeButtonClickHandler}>Close</div>
        </div>
      }
    </>
  );
}