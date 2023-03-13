import React from "react";
import ReactDOM from "react-dom/client";
import Editor from "./components/Editor";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="App">
      <Editor />
    </div>
  </React.StrictMode>
);
