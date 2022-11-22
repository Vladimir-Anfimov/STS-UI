import React, { useContext, useEffect, useState } from "react";
import { modificaCoordonate } from "../../api/devizeApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateActivitati } from "../../redux/slices/ActivitatiSlice";
import AccountContext from "../../store/AccountStore";
import { alertError, alertSuccess, askIfSure } from "../../utils/AlertTypes";
import showGelocationError from "../../utils/GeolocationErrors";
import {
  EvidentaActivitate,
  EvidentaDeviz,
} from "../activitati/ActivitatiTypes";
import { IUpdateCoordonate } from "../deviz/DevizBasic";

interface IProps {
  deviz: EvidentaDeviz;
  locationEnabled: boolean;
}

export default function ActivitateDevizTraseu({
  deviz,
  locationEnabled,
}: IProps) {
  const { account } = useContext<any>(AccountContext);
  const { activitati } = useAppSelector((state) => state.activitati);
  const dispatch = useAppDispatch();

  function UpdateCoordonate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        askIfSure(
          `Sigur vreti sa schimbati coordonatele actuale (lat:${deviz.latitudinePunctDeLucru.toFixed(
            6
          )}, long:${deviz.longitudinePunctDeLucru.toFixed(6)})
                obiectivului de la adresa ${
                  deviz.adresa
                } cu noile coordonate (lat:${position.coords.latitude.toFixed(
            6
          )}, long:${position.coords.longitude.toFixed(6)})?`,
          () => {
            const _updCoord: IUpdateCoordonate = {
              IdDeviz: deviz.idDeviz,
              Longitudine: position.coords.longitude,
              Latitudine: position.coords.latitude,
            };
            modificaCoordonate(account.token, _updCoord)
              .then((res) => {
                if (res.rezultat == 0) {
                  alertSuccess("Coordonate modificate cu succes.");
                  const _activitati = activitati.map((x) => ({
                    ...x,
                    ...(x.dateDeviz &&
                      x.dateDeviz.idDeviz === deviz.idDeviz && {
                        latitudinePunctDeLucru: _updCoord.Latitudine,
                        longitudinePunctDeLucru: _updCoord.Longitudine,
                      }),
                  })) as EvidentaActivitate[];
                  dispatch(updateActivitati(_activitati));
                } else throw new Error();
              })
              .catch((err) => {
                console.log(err);
                alertError(
                  `A aparut o eroare la modificarea coordonatelor. EROARE: ${err}`
                );
              });
          }
        );
      });
    } else alertError("A aparut o eroare la citirea locatiei.");
  }

  return (
    <>
      <a
        href={`http://maps.google.com/?q=${deviz.latitudinePunctDeLucru},${deviz.longitudinePunctDeLucru}`}
        target="_blank"
        className="btn  btn-primary shadow col-lg-3 col-10"
      >
        Traseu
      </a>
      <button
        onClick={UpdateCoordonate}
        disabled={!locationEnabled}
        className="btn btn-secondary shadow col-lg-3 col-10"
      >
        Actualizeaza traseu
      </button>
    </>
  );
}
