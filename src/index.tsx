import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { HashRouter as Router } from "react-router-dom";
import { AccountProvider } from "./store/AccountStore";
import { PontajProvider } from "./store/PontajStore";
import { DevizeProvider } from "./store/DevizeStore";
import { ParteneriProvider } from "./store/ParteneriStore";
import { LastLocationProvider } from "react-router-last-location";
import { DevizTemporaryStateProvider } from "./store/DevizStore";
import { register } from "./serviceWorker";

ReactDOM.render(
  <AccountProvider>
    <PontajProvider>
      <DevizeProvider>
        <DevizTemporaryStateProvider>
          <ParteneriProvider>
            <Router>
              <LastLocationProvider>
                <App />
              </LastLocationProvider>
            </Router>
          </ParteneriProvider>
        </DevizTemporaryStateProvider>
      </DevizeProvider>
    </PontajProvider>
  </AccountProvider>,
  document.getElementById("root")
);

register();
