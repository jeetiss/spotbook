/* istanbul ignore file */

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import PWAPrompt from "react-ios-pwa-prompt";

ReactDOM.render(
  <>
    <PWAPrompt
      timesToShow={10}
      permanentlyHideOnDismiss={false}
      copyTitle="Add SpotBook to Home Screen"
      copyBody="SpotBook works best when added to your homescreen. Without doing this, you may have a degraded experience."
      copyClosePrompt="Close"
    />
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
