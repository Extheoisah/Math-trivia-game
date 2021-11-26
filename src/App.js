import { useState } from "react";
import "./App.css";

import TriviaContext from "./context";
import { Outlet } from "react-router";

function App() {
  const [score, setScore] = useState(0);

  return (

    <div className="App">
      
      <TriviaContext.Provider value={{ score, setScore }}>
        <Outlet />
      </TriviaContext.Provider>

      <footer>
        <p>&copy; Theophilus &amp; Baribor, 2021.</p>
      </footer>
    </div>

  );
}

export default App;
