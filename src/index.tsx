/**
 * Vendors
 */
import React from "react";
import ReactDOM from "react-dom";

/**
 * Styles
 */
/* eslint import/no-webpack-loader-syntax: off */
import css from "!!raw-loader!!sass-loader!./assets/scss/app.scss";

/**
 * Components
 */
import App from "./components/App";

class WeatherWidget extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    mountPoint.innerHTML = `<style>${css}</style>`;
    const container = document.createElement("div");
    mountPoint.appendChild(container);
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      container
    );
  }
}
customElements.define("weather-widget", WeatherWidget);

/**
 * Render
 */
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
