import React, { useEffect, useContext, useState } from "react";
import AccountContext from "../../store/AccountStore";
import {
  incarcaChestionar,
  ITehnicFetchParams,
  trimiteChestionar,
} from "../../api/tehnicApi";
import { alertError, alertSuccess, alertWarning } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";

export interface Chestionar {
  idMentenanta: number;
  idOperatiune: number;
  denumireOperatiune: string;
  idModVerificare: number;
  modVerificare: string;
  observatii: string;
}

interface IChestionarProps {
  id_deviz: number;
  chestionar: Chestionar[];
  setChestionar: Function;
  loadingChestionar: boolean;
  setLoadingChestionar: Function;
  ChangeHistory: Function;
}

function TehnicChestionar({
  id_deviz,
  chestionar,
  setChestionar,
  loadingChestionar,
  setLoadingChestionar,
  ChangeHistory,
}: IChestionarProps) {
  const { account } = useContext<any>(AccountContext);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (loadingChestionar !== false) {
      const params: ITehnicFetchParams = {
        CodSal: account.CodSal,
        IdDecont: id_deviz,
        IdTodo: 0,
      };
      incarcaChestionar(account.token, params)
        .then((res: any) => {
          if (res.chestionar === null) {
            alertWarning(
              "Chestionarul de la devizul respectiv nu mai este valabil."
            );
            ChangeHistory("/devize");
          } else {
            setChestionar(res.chestionar);
            setLoadingChestionar(false);
          }
        })
        .catch((err) => {
          alertError("A aparut o eroare la incarcarea chestionarului.");
          console.log(err);
          setLoadingChestionar(false);
        });
    }
  }, []);

  function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const _chestionar: Chestionar[] = chestionar.map((prop: Chestionar) => {
      if (prop.idMentenanta == Number(e.target.name))
        return { ...prop, idModVerificare: Number(e.target.value) };
      else return prop;
    });
    setChestionar(_chestionar);
  }

  function handleChangeDetalii(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const _chestionar: Chestionar[] = chestionar.map((prop: Chestionar) => {
      if (prop.idMentenanta == Number(e.target.name))
        return { ...prop, observatii: e.target.value };
      else return prop;
    });
    setChestionar(_chestionar);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoadingSubmit(true);
    trimiteChestionar(account.token, chestionar)
      .then((res: any) => {
        console.log(res);
        alertSuccess("Chestionar salvat cu succes.");
      })
      .catch((err: any) => {
        console.log(err);
        alertError("A aparut o eroare la trimiterea chestionarului.");
      })
      .finally(() => setLoadingSubmit(false));
  }

  if (loadingChestionar === true) return <Spinner />;
  else if (chestionar.length === 0)
    return <h2>Nu exista elemente introduse in chestionar.</h2>;
  else
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <ul className="list-group mt-4">
            {chestionar.map((opt, index) => (
              <li key={opt.idMentenanta} className="list-group-item">
                <div className="mb-1">
                  <b>
                    {index + 1}. {opt.denumireOperatiune}
                  </b>
                </div>
                <div>
                  <div className="form-group">
                    <select
                      name={opt.idMentenanta.toString()}
                      value={opt.idModVerificare}
                      onChange={handleChangeSelect}
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option value={0}>Neverificat</option>
                      <option value={1}>Conform</option>
                      <option value={2}>Neconform</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    autoComplete="off"
                    value={opt.observatii}
                    name={opt.idMentenanta.toString()}
                    onChange={handleChangeDetalii}
                    className="form-control"
                    placeholder="Detalii..."
                    id="exampleFormControlTextarea1"
                    rows={2}
                  ></textarea>
                </div>
              </li>
            ))}
          </ul>
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
    );
}

export default TehnicChestionar;
