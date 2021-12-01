/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaExclamationCircle } from "react-icons/fa";
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

const createdUser = (user) => {

  const Body = () => {
    return (
      <>
        <h6>Welcome onboard <span style={{ color: 'var(--green)' }}>{user}</span></h6>
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
    const {user, dismissDialog, showDialog, dialogContent, authenticated } = useContext(TriviaContext);

    const handleChange = () => {
      error.current.style.display = 'none';
    }

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      showLoading(dialogBodyRef, setLoading);

      let password = passwordRef.current.value;

      let response = await fetch(`http://localhost:8000/api/auth/?user=${userParam}&password=${password}`)
        .then(response => response)
        .catch(() => {
          console.log('error');
        });

      dismissLoading(dialogBodyRef, setLoading);
      if (response.status === 404) {
        error.current.style.display = 'block';
        error.current.lastChild.innerText = 'invalid password';
        console.log('invalid password');
      } else {
        console.log('valid password');
        authenticated.current = true;
        dismissDialog();
        navigate('/end');
      }

    }


    const handleCreate = () => {
      dismissDialog()

      dialogContent.current = {
        ...dialogState["startOpen"], closeListener: () => {
          navigate('/end');
        },
        argument: user.current,
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
                <input ref={passwordRef} type="text" placeholder="Enter password" required style={{ marginTop: '5px' }} onChange={handleChange} />
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
      console.log("submitting", passwordRef.current.value);
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

      let resp = await fetch(`http://127.0.0.1:8000/api/scores/${username}/`)
        .then(response => response)
        .catch(err => {
          //handle error
        });
      if (resp.status === 200) {
        //handleError: username has been taken
        error.current.style.display = 'block';
        error.current.lastChild.innerText = 'username has been taken';
        console.log('username taken');
        dismissLoading(dialogBodyRef, setLoading);
        return
      }

      let format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0-9]/;
      if (format.test(username)) {
        error.current.style.display = 'block';
        error.current.lastChild.innerText = "Only letters allowed";
        dismissLoading(dialogBodyRef, setLoading);
        return;
      }
      let response = await fetch('http://127.0.0.1:8000/api/scores/', params)
        .then(response => response)
        .catch(err => {
          console.log(err.message);
          dismissLoading(dialogBodyRef, setLoading);
        });


      if (response.status === 201) {
        params.method = 'PUT';
        fetch(`http://127.0.0.1:8000/api/scores/${username}/`, params)
          .then(() => {
            dismissLoading(dialogBodyRef, setLoading);
            console.log('created user successfully');
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
        console.log('error creating user');
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
                <input ref={passwordRef} type="text" placeholder="Enter password" required style={{ marginTop: '5px' }} />
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