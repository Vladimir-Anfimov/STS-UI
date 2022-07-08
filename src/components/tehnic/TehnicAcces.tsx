import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { primesteDateAcces, salveazaDateAcces } from "../../api/tehnicApi";
import AccountContext from "../../store/AccountStore";
import { alertError, alertSuccess, alertWarning } from "../../utils/AlertTypes";

export interface IAccesData {
  alarmaInstallerCode: string;
  alarmaMasterCode: string;
  dvrAdmin: string;
  dvrParola: string;
  accesInstallerCode: string;
  incendiuInstallerCode: string;
  observatii: string;
  idProiect: number;
}

function TehnicAcces({ match, history }: any) {
  const [data, setData] = useState<IAccesData>({
    alarmaInstallerCode: "",
    alarmaMasterCode: "",
    dvrAdmin: "",
    dvrParola: "",
    accesInstallerCode: "",
    incendiuInstallerCode: "",
    observatii: "",
    idProiect: 0,
  });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { account } = useContext<any>(AccountContext);

  useEffect(() => {
    const IdDecont: number = Number(match.params.id_deviz);
    console.log(IdDecont);

    primesteDateAcces(account.token, IdDecont, account.CodSal)
      .then((res: any) => {
        // PRIMESC ID PROIECT SI IL FOLOSESC LA MODIFICARE PAROLE
        if (res.parole.alarmaInstallerCode === "Nealocat") {
          alertWarning("Proiectul nu a fost alocat.");
          history.push("/devize");
        } else setData(res.parole);
      })
      .catch((err) => {
        console.log(err);
        alertError(`A aparut o eroare la cererea datelor la nivel de API.`);
        history.push("/devize");
      });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoadingSubmit(true);
    salveazaDateAcces(account.token, data)
      .then((res: any) => {
        if (res.parole !== 0)
          alertError("Eroare din baza de date, nu la nivel de client.");
        else alertSuccess("Date salvate cu succes.");
      })
      .catch((err) => {
        console.log(err);
        alertError("A aparut o eroare la salvarea datelor la nivel de API.");
      })
      .finally(() => setLoadingSubmit(false));
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            alarmaInstallerCode
          </label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={data.alarmaInstallerCode}
            name="alarmaInstallerCode"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>alarmaMasterCode</label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={data.alarmaMasterCode}
            name="alarmaMasterCode"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>dvrAdmin</label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={data.dvrAdmin}
            name="dvrAdmin"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>dvrParola</label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={data.dvrParola}
            name="dvrParola"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>accesInstallerCode</label>
          <input
            onChange={handleChange}
            value={data.accesInstallerCode}
            name="accesInstallerCode"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>incendiuInstallerCode</label>
          <input
            onChange={handleChange}
            value={data.incendiuInstallerCode}
            name="incendiuInstallerCode"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Observatii</label>
          <textarea
            rows={3}
            onChange={handleChange}
            value={data.observatii}
            name="observatii"
            className="form-control"
          ></textarea>
        </div>

        <div className="d-flex justify-content-center pt-1 mb-3 pb-1 bg-white ">
          <button
            className="btn BTN-PROGRAM btn-primary btn-lg shadow mt-2 mb-2"
            disabled={loadingSubmit === true}
          >
            {loadingSubmit === true ? "Se salveaza..." : "Salveaza"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(TehnicAcces);
