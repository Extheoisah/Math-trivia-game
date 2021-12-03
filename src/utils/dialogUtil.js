/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaExclamationCircle } from "react-icons/fa";
import TriviaContext from '../context';
import { updateScore, validateInput } from './generalUtil';
import { urls } from './api';
import './dialog.css';

/**
 * Display a loading spinner in the dialog, disabling any user interraction
 * @param {*} ref a reference to the body of the dialog
 * @param {*} setter a state setter of the loading component
 */
const showLoading = (ref, setter) => {
  ref.current.style.filter = 'blur(5px)';
  ref.current.style.pointerEvents = 'none';
  setter(true);
}


/**
 * Stops the loading display, re-enabling user interraction
 * @param {*} ref a reference to the body of the dialog
 * @param {*} setter a state setter of the loading component
 */
const dismissLoading = (ref, setter) => {
  ref.current.style.filter = 'blur(0px)';
  ref.current.style.pointerEvents = 'all';
  setter(false);
}

/**
 * Initial dialog content that shows when a user visit the site.
 */
const welcomeMessage = () => {
  return (
    <>
      <p>Hi Dear! <br /> Welcome to this mini-version of <b>Math Trivia</b>.</p>
      <p>If you encounter any bug do well to contact the developers.</p>
      <p>Goto the links at the bottom.</p>
    </>
  )
};


/**
 * Notification dialog that pops up after a successful user creation. 
 */
const createdUser = (mUser) => {

  const Body = () => {
    const {user, currentHighScore, score} = useContext(TriviaContext);

    useEffect(()=>{
      user.current = mUser;
      currentHighScore.current = score.current;

    },[]);

    return (
      <>
        <h4>Welcome onboard <span style={{ color: 'var(--green)' }}>{mUser}</span></h4>
        <p>Please keep your password safe as we don't have any backup if you misplace it.</p>
        <p>Enjoy the game and do leave a <a href="mailto:saturdaybaribor@gmail.com">feedback</a></p>
      </>
    );
  }
  return <Body />
}


const existingUserDialog = (userParam) => {

  const Body = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const passwordRef = useRef();
    const dialogBodyRef = useRef();
    const error = useRef();
    const { user, score, dismissDialog, showDialog, dialogContent, authenticated, currentHighScore } = useContext(TriviaContext);

    const handleChange = () => {
      error.current.style.display = 'none';
    }

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      showLoading(dialogBodyRef, setLoading);

      let password = passwordRef.current.value;

      let mResponse;

      await fetch(`${urls.authBase}?user=${userParam}&password=${password}`)
        .then(response => {
          mResponse = response;
          return response.json();
        })
        .then(data => currentHighScore.current = data[0].score)
        .catch(() => {
          console.log('error');
        });

      dismissLoading(dialogBodyRef, setLoading);
      if (mResponse.status === 404) {
        error.current.style.display = 'block';
        error.current.lastChild.innerText = 'invalid password';
      } else {
        authenticated.current = true;
        user.current = userParam;
        if (score.current > currentHighScore.current) {
          let response = updateScore(score.current, userParam);
          response.then(data => {

            if (data.status === 200) {
              showLoading(dialogBodyRef, setLoading);
              setTimeout(() => navigate('/end'), 500);
            } else {
              console.log('error updating')
            }

          });
        } else {
          navigate('/end');
        }
        dismissDialog();

      }

    }


    const handleCreate = () => {
      dismissDialog()

      dialogContent.current = {
        ...dialogState["startOpen"], closeListener: () => {
          navigate('/end');
        },
        argument: '',
        hasUsernameField: true
      };

      setTimeout(showDialog, 200);
    }

    return (
      <>
        <div ref={dialogBodyRef}>
          <p>Welcome back {userParam}</p>
          <p>Enter your password to login.</p>
          <form method="post" onSubmit={handleSubmit} >
            <div className="input-container">
              <div className='input-layout'>
                <input ref={passwordRef} type="password" placeholder="Enter password" required style={{ marginTop: '5px' }} onChange={handleChange} />
              </div>
              <div ref={error} className="error"><FaExclamationCircle color='var(--red)' /><p></p></div>
            </div>
            <input type="submit" value="Submit" className='button bg-success' />

            <p style={{ fontSize: '.9em' }}>If this is not you <span style={{ color: 'var(--green)', fontWeight: '700', cursor: 'pointer' }} onClick={handleCreate}>Create an account</span></p>
          </form>
        </div>
        {
          loading && <div className="loader"></div>
        }
      </>
    );
  }

  return <Body />;
}


const loginDetails = (user) => {



  const Body = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const passwordRef = useRef();
    const usernameRef = useRef();
    const dialogBodyRef = useRef();
    const error = useRef();
    const { dismissDialog, showDialog, dialogContent, authenticated, score } = useContext(TriviaContext);
    let username = user;

    const handleChange = () => {
      error.current.style.display = 'none';
    }
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      let password = passwordRef.current.value;
      if (dialogContent.current.hasUsernameField) {
        username = usernameRef.current.value;
      }
      showLoading(dialogBodyRef, setLoading);

      let params = {

        method: "POST",
        body: JSON.stringify({
          score: score.current,
          user: username,
          password: password
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      };

      let resp = await fetch(`${urls.scoresBase}${username}/`)
        .then(response => response)
        .catch(() => {
          //handle error
        });
      if (resp.status === 200) {
        //handleError: username has been taken
        error.current.style.display = 'block';
        error.current.lastChild.innerText = 'username has been taken';
        dismissLoading(dialogBodyRef, setLoading);
        return
      }

      let validName = validateInput(username, error);
      if(!validName){
        dismissLoading(dialogBodyRef, setLoading);
        return
      }

      let response = await fetch(urls.scoresBase, params)
        .then(response => response)
        .catch(() => {
          dismissLoading(dialogBodyRef, setLoading);
        });


      if (response.status === 201) {
        params.method = 'PUT';
        fetch(`${urls.scoresBase}${username}/`, params)
          .then(() => {
            dismissLoading(dialogBodyRef, setLoading);
            dialogContent.current = {
              ...dialogState["accountCreationSuccessful"], closeListener: () => {
                navigate('/end');
              },
              argument: username
            };
            dismissDialog();
            setTimeout(showDialog, 200);
            authenticated.current = true;

          })
          .catch(err => {
            console.log(err.message);
            dismissLoading(dialogBodyRef, setLoading);
          });

      } else {
        dismissLoading(dialogBodyRef, setLoading);
      }

    }

    return (
      <>
        <div ref={dialogBodyRef}>
          <p>Great score! {user}</p>
          <p>Get your friends to see your score by registering as a user!</p>
          <form method="post" onSubmit={handleSubmit} className=''>
            {
              dialogContent.current.hasUsernameField &&
              <div className="input-container">
                <div className='input-layout'>
                  <input ref={usernameRef} type="text" placeholder="Enter username" required style={{ marginTop: '5px' }} onChange={handleChange} />
                </div>
                <div ref={error} className="error"><FaExclamationCircle color='var(--red)' /><p></p></div>
              </div>

            }
            <div className="input-container">
              <div className='input-layout'>
                <input ref={passwordRef} type="password" placeholder="Enter password" required style={{ marginTop: '5px' }} />
              </div>
            </div>
            <input type="submit" value="Submit" className='button bg-success' />
          </form>
        </div>
        {
          loading && <div className="loader"></div>
        }
      </>
    );
  }

  return <Body />

};



/**
 * A plain dialog that shows a loading spinner and an error message if need be.
 */
const loadingDialog = ()=>{

  const Body = ()=>{
    const dialogBodyRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      showLoading(dialogBodyRef, setLoading);
    },[]);

    return(
      <div>
        <div ref={dialogBodyRef}>
          <p></p>
        </div>
        {
          loading && <div className='loader'></div>
        }
      </div>
    );
  }
  return <Body />
}


export const dialogState = {
  'home': {
    title: 'Welcome to Math Trivia',
    body: welcomeMessage
  },

  'startOpen': {
    title: 'Login Details',
    body: loginDetails,
    hasUsernameField: false
  },

  'startExistingUser': {
    title: 'Login Details',
    body: existingUserDialog
  },

  'accountCreationSuccessful': {
    title: 'Congratulations!!!',
    body: createdUser
  },

  'loading':{
    title: '',
    body: loadingDialog
  }
}



/**
 * A component for user interaction and notification.
 * The stateHandler property is a function that receives the state function of the dialog.
 */
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