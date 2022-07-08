import React, { useContext, useEffect, useState } from "react";
import AccountContext from "../../store/AccountStore";
import {
  incarcaConstatari,
  ITehnicFetchParams,
  trimiteConstatari,
} from "../../api/tehnicApi";
import { alertError, alertSuccess, alertWarning } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";

export interface Constatare {
  constatari: string;
  echipamenteMateriale: string;
  problemeNerezolvate: string;
  propuneri: string;
}

interface IConstatariProps {
  id_deviz: number;
  constatari: Constatare;
  setConstatari: Function;
  loadingConstatari: boolean;
  setLoadingConstatari: Function;
  ChangeHistory: Function;
}

function TehnicConstatari({
  id_deviz,
  constatari,
  setConstatari,
  loadingConstatari,
  setLoadingConstatari,
  ChangeHistory,
}: IConstatariProps) {
  const { account } = useContext<any>(AccountContext);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (loadingConstatari !== false) {
      const params: ITehnicFetchParams = {
        CodSal: account.CodSal,
        IdDecont: id_deviz,
      };
      incarcaConstatari(account.token, params)
        .then((res) => {
          console.log(res);
          setConstatari(res.rezultat);
        })
        .catch((err) => {
          alertError("A aparut o eroare la incarcarea chestionarului.");
          console.log(err);
        })
        .finally(() => setLoadingConstatari(false));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setConstatari({ ...constatari, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      constatari.constatari.length == 0 ||
      constatari.echipamenteMateriale.length == 0 ||
      constatari.problemeNerezolvate.length == 0 ||
      constatari.propuneri.length == 0
    )
      alertWarning(
        "Va rugam sa introduceti date in toate campurile inainte de a salva."
      );
    else {
      setLoadingSubmit(true);
      const params: ITehnicFetchParams = {
        CodSal: account.CodSal,
        IdDecont: id_deviz,
      };
      trimiteConstatari(account.token, constatari, params)
        .then((res: any) => {
          console.log(res);
          alertSuccess("Constatari salvate cu succes.");
        })
        .catch((err: any) => {
          console.log(err);
          alertError("A aparut o eroare la trimiterea constatarilor.");
        })
        .finally(() => setLoadingSubmit(false));
    }
  }

  if (loadingConstatari === true) return <Spinner />;
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-5">Constatari</h1>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Constatarile prestatorului
            </label>
            <textarea
              autoComplete="off"
              onChange={handleChange}
              value={constatari.constatari}
              name="constatari"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Echipamente si materiale inlocuite
            </label>
            <textarea
              autoComplete="off"
              onChange={handleChange}
              value={constatari.echipamenteMateriale}
              name="echipamenteMateriale"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Problemele au fost / nu au fost rezolvate in totalitate din
              urmatoarele motive
            </label>
            <textarea
              autoComplete="off"
              onChange={handleChange}
              value={constatari.problemeNerezolvate}
              name="problemeNerezolvate"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Propuneri pentru beneficiar
            </label>
            <textarea
              autoComplete="off"
              onChange={handleChange}
              value={constatari.propuneri}
              name="propuneri"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="FIXED-SAVE-BTN d-flex justify-content-center pt-1 pb-1 bg-white ">
            <button
              className="btn BTN-PROGRAM btn-primary btn-lg shadow mt-2 mb-2"
              disabled={loadingSubmit === true}
            >
              {loadingSubmit === true
                ? "Se salveaza..."
                : "Salveaza chestionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TehnicConstatari;
