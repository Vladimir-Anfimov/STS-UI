import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AccountContext from "../store/AccountStore";
import Spinner from "../components/layout/Spinner";
import Navbar from "../components/layout/Navbar";
import { ComparaRoluriAcces } from "./Helpers";
import { alertWarning } from "../utils/AlertTypes";
import PontajContext from "../store/PontajStore";
import { useLastLocation } from "react-router-last-location";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { account }: any = useContext(AccountContext);
  const { pontajState }: any = useContext(PontajContext);
  const lastLocation = useLastLocation();

  function renderPage(props: any) {
    if (account.valid === null) return <Spinner />;
    else if (account.valid === true) {
      if (ComparaRoluriAcces(account.roles, rest.requiredRoles) === true) {
        if (rest.requiredStartedPontaj === true) {
          if (pontajState === null) return <Spinner />;
          else if (pontajState === 0) {
            alertWarning("Te rugam sa intri la program.");
            return <Redirect to="/pontaj" />;
          } else
            return (
              <div className="WRAPPER">
                <Navbar />
                <div className="COMPONENT">
                  <Component {...props} />
                </div>
              </div>
            );
        } else
          return (
            <div className="WRAPPER">
              <Navbar />
              <div className="COMPONENT">
                <Component {...props} />
              </div>
            </div>
          );
      } else {
        alertWarning("Nu ai acces la aceasta ruta.");
        return <Redirect to={lastLocation?.pathname || "/pontaj"} />;
      }
    } else return <Redirect to={"/login"} />;
  }

  return <Route {...rest} render={(props) => renderPage(props)} />;
}

export default PrivateRoute;
