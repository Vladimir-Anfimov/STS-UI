import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginController from "./login/LoginController";
import PontajController from "./pontaj/PontajController";
import Error404 from "./Error404";
import PrivateRoute from "../security/PrivateRoute";
import {
  PONTAJ_ROLURI,
  DEVIZE_ROLURI,
  PARTENERI_ROLURI,
} from "../security/RoluriRute";
import DevizeController from "./devize/DevizeController";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap-css-only/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";
import DevizController from "./deviz/DevizController";
import ParteneriController from "./parteneri/ParteneriController";
import Partener from "./parteneri/Partner";
import TehnicMenu from "./tehnic/TehnicMenu";
import TehnicEvenimente from "./tehnic/TehnicEvenimente";
import TehnicRaport from "./tehnic/TehnicRaport";
import HomeController from "./homepage/HomeController";
import TehnicAcces from "./tehnic/TehnicAcces";
import Setari from "./setari/Setari";
import {
  alertInternetLost,
  closeAlert,
  AlertInternetRestabilit,
} from "../utils/AlertTypes";
import ProductScanner from "./deviz/ProductScanner";
import ProduseController from "./produse/ProduseController";
import ActivitatiController from "./activitati/ActivitatiController";

function App() {
  useEffect(() => {
    let internet: boolean = true;
    let alertActive: boolean = false;

    setInterval(() => {
      internet = window.navigator.onLine;
      // console.log('internet', internet, alertActive)
      if (internet === false && alertActive === false) {
        alertActive = true;
        alertInternetLost();
      } else if (internet === true && alertActive === true) {
        alertActive = false;
        closeAlert();
        AlertInternetRestabilit();
      }
    }, 500);
  }, []);

  return (
    <Switch>
      <Route path="/login" exact component={LoginController} />
      <PrivateRoute
        requiredStartedPontaj={false}
        requiredRoles={PONTAJ_ROLURI}
        path="/"
        exact
        component={HomeController}
      />
      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={false}
        requiredRoles={PONTAJ_ROLURI}
        path="/activitati"
        exact
        component={ActivitatiController}
      />

      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={false}
        requiredRoles={PONTAJ_ROLURI}
        path="/pontaj"
        exact
        component={PontajController}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/devize/:id_deviz"
        exact
        component={DevizController}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/devize"
        exact
        component={DevizeController}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/produs/:id_deviz"
        exact
        component={ProductScanner}
      />
      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/tehnicsts/:id_deviz"
        exact
        component={TehnicMenu}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/evenimente/:id_deviz"
        exact
        component={TehnicEvenimente}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/raport/:id_deviz"
        exact
        component={TehnicRaport}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/dateacces/:id_deviz"
        exact
        component={TehnicAcces}
      />
      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={PARTENERI_ROLURI}
        path="/parteneri/:cod_part"
        exact
        component={Partener}
      />
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={PARTENERI_ROLURI}
        path="/parteneri"
        exact
        component={ParteneriController}
      />

      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={true}
        requiredRoles={DEVIZE_ROLURI}
        path="/produse"
        exact
        component={ProduseController}
      />

      {/*  */}
      <PrivateRoute
        requiredStartedPontaj={false}
        requiredRoles={PONTAJ_ROLURI}
        path="/setari"
        exact
        component={Setari}
      />
      {/*  */}
      <PrivateRoute requiredRoles={PONTAJ_ROLURI} component={Error404} />
    </Switch>
  );
}

export default App;
