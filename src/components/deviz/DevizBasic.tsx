import React, { useContext, useState, useEffect } from "react";
import { SingleDeviz } from "./DevizController";
import DevizeContext from "../../store/DevizeStore";
import {
  ClientIcon,
  StartActivateIcon,
  IncheiereActivateIcon,
  MaintenanceIcon,
  FotoIcon,
} from "./DevizIcons";
import {
  primestePersLegaturaDeviz,
  modificaCoordonate,
  startActivitateDeviz,
  stopActivitateDeviz,
} from "../../api/devizeApi";
import AccountContext from "../../store/AccountStore";
import { jwtDecode } from "jwt-js-decode";
import {
  alertWarning,
  alertError,
  askIfSure,
  alertSuccess,
} from "../../utils/AlertTypes";
import { PersoaneLegaturaModal } from "./PersoaneLegaturaModal";
import { AddImage } from "../multiused/AddImage";
import DevizTemporaryStateContext from "../../store/DevizStore";
import showGelocationError from "../../utils/GeolocationErrors";

interface Props {
  deviz: SingleDeviz;
  setDeviz: Function;
  changeHistory: Function;
}

export interface IStartAct {
  CodSal: number;
  IdDecont: number;
}

export interface IStopAct {
  CodSal: number;
  IdDecont: number;
  Observatii: string;
  Concluzii: string;
  ProcentFinalizare: number;
  ResponsabilActivitate: number;
}

export interface PersoanaLegaturaDeviz {
  persoanaDeLegatura: string;
  telefon1: string;
  telefon2: string;
}

export interface IUpdateCoordonate {
  IdDeviz: number;
  Latitudine: number;
  Longitudine: number;
}

function DevizBasic({ deviz, setDeviz, changeHistory }: Props) {
  const { account } = useContext<any>(AccountContext);
  const { devizTemporaryState, setDevizTemporaryState }: any = useContext(
    DevizTemporaryStateContext
  );
  const { devizeState, changeDevizejState } = useContext<any>(DevizeContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [persoaneLegatura, setPersoaneLegatura] = useState<
    PersoanaLegaturaDeviz[]
  >([]);
  const [persLoaded, setPersLoaded] = useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);

  useEffect(() => {
    setDevizTemporaryState({
      ...devizTemporaryState,
      ProcentFinalizare: deviz.data!.procentFinalizare,
    });

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        showGelocationError
      );
    else alertError("A aparut o eroare de la geolocatie.");
  }, []);

  function handleChangeInput(e: any) {
    let valueOfInput = e.target.value;
    if (e.target.name === "ProcentFinalizare")
      valueOfInput = Number(valueOfInput);
    setDevizTemporaryState({
      ...devizTemporaryState,
      [e.target.name]: valueOfInput,
    });
  }

  function handleStartActivitate() {
    setLoading(true);
    startActivitateDeviz(account.token, {
      CodSal: Number(jwtDecode(account.token).payload.id),
      IdDecont: deviz.data!.idDeviz,
    })
      .then((res) => {
        console.log(res);
        changeDevizejState(devizeState.devize, false);
        setDeviz({
          ...deviz,
          loading: false,
          data: {
            ...deviz.data,
            idActivitateInceputa: res.idActivitateInceputa,
          },
        });
      })
      .catch((err) => {
        alertError("A aparut o eroare la inceperea activitatii.");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleStopActivitate() {
    const observatiiLen = devizTemporaryState.Observatii.length;
    const concluziiLen = devizTemporaryState.Concluzii.length;

    if (observatiiLen === 0)
      alertWarning("Va rugam sa completati campul cu activitatea prestata.");
    else if (observatiiLen >= 99)
      alertWarning(
        "Campul cu activitatea prestata nu accepta mai mult de 100 de caractere."
      );
    else if (concluziiLen >= 499)
      alertWarning(
        "Campul cu concluzii nu accepta mai mult de 500 de caractere."
      );
    else {
      setLoading(true);
      stopActivitateDeviz(account.token, {
        CodSal: Number(jwtDecode(account.token).payload.id),
        IdDecont: deviz.data!.idDeviz,
        Observatii: devizTemporaryState.Observatii,
        Concluzii: devizTemporaryState.Concluzii,
        ProcentFinalizare: devizTemporaryState.ProcentFinalizare,
        ResponsabilActivitate: deviz.data!.responsabilActivitate,
      })
        .then((res) => {
          console.log(res);
          changeDevizejState(devizeState.devize, false);
          changeHistory("devize");
        })
        .catch((err) => {
          alertError("A aparut o eroare la incheierea activitatii.");
          console.log(err);
          setLoading(false);
        });
    }
  }

  function LoadPersoaneLegatura() {
    if (persLoaded === false) {
      primestePersLegaturaDeviz(account.token, deviz.data!.idDeviz)
        .then((res) => {
          setPersoaneLegatura(res.persleg);
        })
        .catch(() =>
          alertError("A aparut o eroare la incarcarea persoanelor de legatura.")
        )
        .finally(() => setPersLoaded(true));
    }
  }

  function UpdateCoordonate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        askIfSure(
          `Sigur vreti sa schimbati coordonatele actuale (lat:${deviz.data!.latitudinePunctDeLucru.toFixed(
            6
          )}, long:${deviz.data!.longitudinePunctDeLucru.toFixed(6)})
                obiectivului de la adresa ${
                  deviz.data!.adresa
                } cu noile coordonate (lat:${position.coords.latitude.toFixed(
            6
          )}, long:${position.coords.longitude.toFixed(6)})?`,
          () => {
            const _updCoord: IUpdateCoordonate = {
              IdDeviz: deviz.data!.idDeviz,
              Longitudine: position.coords.longitude,
              Latitudine: position.coords.latitude,
            };
            modificaCoordonate(account.token, _updCoord)
              .then((res) => {
                if (res.rezultat == 0) {
                  alertSuccess("Coordonate modificate cu succes.");
                  changeDevizejState(devizeState.devize, false);
                  setDeviz({
                    ...deviz,
                    data: {
                      ...deviz.data,
                      latitudinePunctDeLucru: _updCoord.Latitudine,
                      longitudinePunctDeLucru: _updCoord.Longitudine,
                    },
                  });
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
    <div className="container">
      <div className="jumbotron mt-4">
        <div className="row">
          <div className="col col-12 d-flex">
            <ClientIcon />
            <div className="d-flex flex-column justify-content-center align-items-start">
              <span>
                <b>Nr. deviz:</b> {deviz.data!.numarDeviz}
              </span>
              <span>
                <b>Nr. dosar:</b> {deviz.data!.numarDosar}
              </span>
            </div>
          </div>
          <div className="col col-12 mt-2 BTN-DATA">
            <span> {deviz.data!.client}</span>
            <span>{deviz.data!.denumirePunctDeLucru}</span>
            <div
              style={window.innerWidth <= 768 ? { textAlign: "center" } : {}}
            >
              <button
                data-backdrop="false"
                data-toggle="modal"
                data-target="#exampleModal3"
                onClick={LoadPersoaneLegatura}
                className="btn btn-primary btn-sm shadow col-5 col-lg-3"
              >
                Persoane legatura
              </button>
              <button
                className="btn btn-primary btn-sm shadow col-5 col-lg-3"
                onClick={() => changeHistory("produs")}
              >
                Scaneaza produs{" "}
              </button>
              <PersoaneLegaturaModal
                persoaneLegatura={persoaneLegatura}
                persLoaded={persLoaded}
              />
              <hr />
              <span>
                <b>Latitudine:</b>{" "}
                {deviz.data!.latitudinePunctDeLucru.toFixed(2)} &nbsp;
                <b>Longitudine:</b>{" "}
                {deviz.data!.longitudinePunctDeLucru.toFixed(2)}
              </span>
              <div className="row">
                <a
                  href={`http://maps.google.com/?q=${
                    deviz.data!.latitudinePunctDeLucru
                  },${deviz.data!.longitudinePunctDeLucru}`}
                  target="_blank"
                  className="btn BTN-PROGRAM btn-primary btn-sm shadow ml-4 col-5 col-lg-2"
                >
                  Traseu
                </a>
                <button
                  onClick={UpdateCoordonate}
                  disabled={!locationEnabled}
                  className="btn BTN-PROGRAM btn-secondary btn-sm shadow col-5 col-lg-2"
                >
                  Actualizeaza
                </button>
              </div>
            </div>
            <hr />
            {deviz.data!.idActivitateInceputa === 0 &&
              (loading === true ? (
                <button
                  disabled
                  className="btn BTN-PROGRAM btn-primary btn-lg shadow"
                >
                  <StartActivateIcon />
                  Incepe activitatea...
                </button>
              ) : (
                <button
                  onClick={handleStartActivitate}
                  className="btn BTN-PROGRAM btn-primary btn-lg shadow"
                >
                  <StartActivateIcon />
                  Incepere activitate
                </button>
              ))}

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea3">Detalii</label>
              <textarea
                readOnly
                value={deviz.data!.detaliiDeviz || ""}
                className="form-control"
                id="exampleFormControlTextarea3"
                rows={5}
              ></textarea>
            </div>

            {deviz.data!.idActivitateInceputa !== 0 && (
              <>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Activitatea prestata
                  </label>
                  <textarea
                    autoComplete="off"
                    value={devizTemporaryState.Observatii}
                    onChange={handleChangeInput}
                    name="Observatii"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                  ></textarea>
                </div>

                {deviz.data!.responsabilActivitate === 1 && (
                  <div className="bg-primary text-white px-2 py-4 rounded shadow  mb-5">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea2">
                        Concluzie
                      </label>
                      <textarea
                        autoComplete="off"
                        value={devizTemporaryState.Concluzii}
                        onChange={handleChangeInput}
                        name="Concluzii"
                        className="form-control"
                        id="exampleFormControlTextarea2"
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Procent finalizare</label>
                      <select
                        value={devizTemporaryState.ProcentFinalizare}
                        onChange={handleChangeInput}
                        name="ProcentFinalizare"
                        className="form-control"
                      >
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                          (procent) => (
                            <option key={procent} value={procent}>
                              {procent}%
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={() => changeHistory("tehnicsts")}
                    className="btn BTN-PROGRAM btn-primary btn-lg shadow"
                  >
                    <MaintenanceIcon /> Tehnic STS
                  </button>

                  {loading === true ? (
                    <button
                      disabled
                      className="btn BTN-PROGRAM btn-secondary btn-lg shadow"
                    >
                      <IncheiereActivateIcon />
                      Se incheie...
                    </button>
                  ) : (
                    <button
                      onClick={handleStopActivitate}
                      className="btn BTN-PROGRAM btn-secondary btn-lg shadow"
                    >
                      <IncheiereActivateIcon />
                      Incheie activitate
                    </button>
                  )}

                  <button
                    disabled={!locationEnabled}
                    data-backdrop="false"
                    data-toggle="modal"
                    data-target="#exampleModal2"
                    className="btn BTN-PROGRAM mt-lg-1 mt-4 btn-primary btn-lg shadow"
                  >
                    <FotoIcon /> Adauga foto
                  </button>
                  <AddImage
                    IdPunctDeLucru={deviz.data!.idPunctDeLucru}
                    CodPart={deviz.data!.codPart}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevizBasic;
