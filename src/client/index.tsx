import React from "react";
import ReactDOM from "react-dom";
import Theme from "@theme";
import App from "@components/App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById("app")
);
