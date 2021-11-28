import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ThreeDContext from "./contexts/ThreeDContext";
require("dotenv").config();

window.Kakao.init('ac6de67c03cf43557200e0af641cb6f2');

ReactDOM.render(
  <React.StrictMode>
    <ThreeDContext>
      <Router>
        <App />
      </Router>
    </ThreeDContext>
  </React.StrictMode>,
  document.getElementById("root")
);
