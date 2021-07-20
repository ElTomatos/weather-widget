/**
 * Vendors
 */
import React from "react";
import ReactDOM from "react-dom";

/**
 * Components
 */
import App from "./components/App";

/**
 * Styles
 */
import "./assets/scss/app.scss";

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
