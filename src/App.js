/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import "./App.css";

import TriviaContext from "./context";
import { Outlet } from "react-router";
import { Dialog } from "./utils/dialogUtil";


function App() {
  const score = useRef(0);
  const [user, setUser] = useState('');
  const appRef = useRef(null);
  const initialEntry = useRef(true);
  const authenticated = useRef(false);
  const action = useRef(null);
  let dialogCallBack;
  const dialogContent = useRef({
    title: '',
    body: ()=>{}
  });

  const dismissDialog = () => {
    appRef.current.style.filter = 'blur(0px)';
    appRef.current.style.pointerEvents = 'all';
    dialogCallBack(false);
  }

  const showDialog = () => {
    appRef.current.style.filter = 'blur(3px)';
    appRef.current.style.pointerEvents = 'none';
    dialogCallBack(true);
  }

  const getDialogCallback = (c) => {
    dialogCallBack = c;
  }


  useEffect(() => {
    if (initialEntry.current) {
      showDialog()
      initialEntry.current = false;
    }
  },[]);

  return (


    <div style={{ position: 'relative', }}>

      <TriviaContext.Provider value={{ score, user, setUser, dismissDialog, initialEntry, authenticated, dialogCallBack, action, showDialog, dialogContent }}>
        <div ref={appRef} className="App">


          {console.log('rednnd')}
          <Outlet />
          <footer>
            <p>&copy; <a href='http://github.com/extheoisah'>Theophilus</a> &amp; <a href='https://linkedin.com/in/baribor-saturday'>Baribor</a>, 2021.</p>
          </footer>

        </div>
        <Dialog stateHandler={getDialogCallback} />
      </TriviaContext.Provider>
    </div>




  );
}

export default App;
