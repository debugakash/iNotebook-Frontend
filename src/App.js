import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState("light");
  const [changeIcon, setChangeIcon] = useState();

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleHandler = () => {
    setChangeIcon(!changeIcon);
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212529";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="icon">
            <i onClick={toggleHandler} style={{ color: mode === "dark" ? "white" : "black" }}
              className={changeIcon ? "far fa-sun" : "far fa-moon"}></i>
          </div>
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} changeColor={mode} />} />
              <Route exact path="/about" element={<About changeColor={mode} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} changeColor={mode} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} changeColor={mode} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
