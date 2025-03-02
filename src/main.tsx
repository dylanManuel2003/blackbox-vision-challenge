import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SessionProvider } from "./context/SessionContext";
import "./theme.css";

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
