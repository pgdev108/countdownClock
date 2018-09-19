import React from "react";
import ReactDOM from "react-dom";
import Clock from "./Clock";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
