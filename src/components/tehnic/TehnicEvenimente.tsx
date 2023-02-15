import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import AccountContext from "../../store/AccountStore";
import { incarcaEvenimente } from "../../api/tehnicApi";
import { alertError, alertWarning } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";
import { DateFullFormat } from "../../utils/TimeFunctions";

export interface IFetchEvenimenteParams {
  OreRaport: number;
  IdDecont: number;
  CodSal: number;
}

interface Eveniment {
  receptor: string;
  linie: string;
  zona: string;
  partitie: string;
  eveniment: string;
  detalii: string;
  dataOra: string;
}

function TehnicEvenimente({ match, history }: any) {
  const { account } = useContext<any>(AccountContext);
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [searchParams, setSearchParams] = useState<IFetchEvenimenteParams>({
    IdDecont: Number(match.params.id_deviz),
    CodSal: account.CodSal,
    OreRaport: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  function QueryEvenimente() {
    setLoading(true);
    incarcaEvenimente(account.token, searchParams)
      .then((res) => {
        console.log(res);
        if (res.evenimente === null) {
          alertWarning(
            "Evenimentele de la devizul respectiv nu mai sunt valabile."
          );
          history.push("/activitati");
        } else {
          setEvenimente(res.evenimente);
          setLoading(false);
        }
      })
      .catch((err) => {
        alertError("A aparut o eroare la incarcarea evenimentelor.");
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    QueryEvenimente();
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ ...searchParams, OreRaport: Number(e.target.value) });
  }

  return (
    <div className="container mt-3">
      <div className="jumbotron mt-4">
        <h1 className="display-5 text-center">Evenimente</h1>
        <hr className="my-4" />
        <select
          value={searchParams.OreRaport}
          disabled={loading}
          onChange={handleChange}
          className="form-control mb-2 "
        >
          <option value={1}>Din ultima ora.</option>
          <option value={2}>Din ultimele 2 ore.</option>
          <option value={6}>Din ultimele 6 ore.</option>
          <option value={12}>Din ultimele 12 ore.</option>
        </select>

        <button
          className="btn btn-primary mx-0 btn-lg shadow w-100"
          disabled={loading}
          onClick={QueryEvenimente}
        >
          {loading ? "Se reactualizează..." : "Reactualizează"}
        </button>

        {loading === true && <Spinner />}

        {loading === false && evenimente.length === 0 ? (
          <div className="alert alert-primary" role="alert">
            Nu exista evenimente in{" "}
            {searchParams.OreRaport == 1 ? "ultima" : "ultimele"}{" "}
            <a className="alert-link">
              {searchParams.OreRaport != 1 && searchParams.OreRaport}
            </a>{" "}
            {searchParams.OreRaport == 1 ? "ora" : "ore"}.
          </div>
        ) : (
          <ul className="list-group OPACITY">
            {evenimente.map((eveniment: Eveniment) => {
              const _key: string =
                eveniment.zona + eveniment.receptor + eveniment.dataOra;
              return (
                <li key={_key} className="list-group-item shadow mt-1">
                  <b>Partitie: </b>
                  {eveniment.partitie}
                  <br />
                  <b>Zona: </b>
                  {eveniment.zona}
                  <br />
                  <b>Eveniment: </b>
                  {eveniment.eveniment}
                  <br />
                  <b>Data: </b>
                  {DateFullFormat(eveniment.dataOra)}
                  <br />
                  <b>Detalii: </b>
                  {eveniment.detalii}
                  <br />
                  <b>Linie: </b>
                  {eveniment.linie}
                  <br />
                  <b>Receptor: </b>
                  {eveniment.receptor}
                  <br />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default withRouter(TehnicEvenimente);
