import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Us3rProfileProvider } from "@us3r-network/profile";
import { Us3rThreadProvider } from "@us3r-network/thread";
import { Us3rAuthProvider } from "@us3r-network/authkit";
import { RainbowKitAuthProvider } from "@us3r-network/rainbowkit-auth";

const ceramicHost =
  process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Us3rProfileProvider ceramicHost={ceramicHost}>
      <Us3rThreadProvider ceramicHost={ceramicHost}>
        <Us3rAuthProvider
          authConfig={{
            appName: "RainbowKit Auth Demo",
            authToolTypes: []
          }}
        >
          <RainbowKitAuthProvider>
            <App />
          </RainbowKitAuthProvider>
        </Us3rAuthProvider>
      </Us3rThreadProvider>
    </Us3rProfileProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
