import "./App.css";
import FirstPage from "./components/FirstPage.js";
import StudentsPage from "./components/StudentsPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import read from "./actions/read";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<FirstPage />}></Route>
          <Route exact path="/students" element={<StudentsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
