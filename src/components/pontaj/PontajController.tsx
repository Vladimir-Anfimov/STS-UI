import React, { useState, useEffect, useContext } from "react";
import { trimiteStareOperatiune } from "../../api/pontajApi";
import AccountContext from "../../store/AccountStore";
import { jwtDecode } from "jwt-js-decode";
import PontajContext from "../../store/PontajStore";
import Spinner from "../layout/Spinner";
import {
  BtnIncepeProgram,
  BtnIncepePauza,
  BtnIncheieProgram,
  BtnIncheiePauza,
} from "./PontajButtons";
import { alertError } from "../../utils/AlertTypes";
import { AfiseazaCitatRandom } from "../../utils/Citate";
import showGelocationError from "../../utils/GeolocationErrors";

export interface Operatiune {
  CodSal: number;
  CodOperatiune: number;
  Latitudine: number;
  Longitudine: number;
}

function PontajController() {
  const { pontajState, setPontajState, loading }: any =
    useContext(PontajContext);
  const { account }: any = useContext(AccountContext);
  const [citat, setCitat] = useState<string>("");

  useEffect(() => setCitat(AfiseazaCitatRandom()), []);

  function trimiteStatusActivitate(
    _codOperatiune: number,
    _pontajState: number
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => HandleSend(position, _codOperatiune, _pontajState),
        showGelocationError
      );
    } else alertError("A aparut o eroare de la geolocatie.");
  }

  function HandleSend(
    position: any,
    _codOperatiune: number,
    _pontajState: number
  ) {
    setPontajState(_pontajState);
    const operatiune: Operatiune = {
      CodSal: Number(jwtDecode(account.token).payload.id),
      CodOperatiune: _codOperatiune,
      Latitudine: position.coords.latitude,
      Longitudine: position.coords.longitude,
    };
    trimiteStareOperatiune(account.token, operatiune)
      .then((res: { rezultat: number }) => {
        if (res.rezultat !== 0) alertError("A aparut o eroare de la server!");
      })
      .catch((err: any) => {
        alertError("A aparut o eroare de API");
        console.log(err);
      });
  }

  function ButtonDOM() {
    if (pontajState === null || loading) return <Spinner />;
    else if (pontajState === 0)
      return <BtnIncepeProgram onClick={() => trimiteStatusActivitate(1, 1)} />;
    else if (pontajState === 1)
      return (
        <>
          <BtnIncepePauza onClick={() => trimiteStatusActivitate(3, 2)} />
          <BtnIncheieProgram onClick={() => trimiteStatusActivitate(2, 0)} />
        </>
      );
    else
      return (
        <>
          <BtnIncheiePauza onClick={() => trimiteStatusActivitate(4, 1)} />
          <BtnIncheieProgram onClick={() => trimiteStatusActivitate(2, 0)} />
        </>
      );
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-5">Bine ai venit!</h1>
        <p className="lead">Spor la munca!</p>
        <hr className="my-4" />
        <p style={{ fontStyle: "italic" }}>{citat}</p>
        <ButtonDOM />
      </div>
    </div>
  );
}

export default PontajController;
