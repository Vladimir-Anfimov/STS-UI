import React, { useContext, useEffect, useState } from "react";
import { accessTehnic, ITehnicFetchParams } from "../../api/tehnicApi";
import AccountContext from "../../store/AccountStore";
import { alertError, alertWarning } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";

function TehnicMenu({ history, match }: any) {
  const { account } = useContext<any>(AccountContext);
  const id_deviz = match.params.id_deviz;
  const [access, setAccess] = useState<number | string>("wait");

  function HandleAcces(code: string) {
    switch (code) {
      case "-1":
        alertWarning(
          `Nu exista nicio activitate adaugata in [Proiecte] sau activitatea este adaugata dar nu are alocat un deviz de lucrari. Cod: ${code}`
        );
        setAccess(-1);
        break;
      case "-2":
        alertWarning(
          `Intervalul de timp alocat interventiei echipei tehnice este expirat. Cod: ${code}`
        );
        setAccess(-2);
        break;
      case "-3":
        alertWarning(
          `ID sistem de alarma nedefinit in [Proiecte]. Cod: ${code}`
        );
        setAccess(-3);
        break;
      case "-4":
        alertWarning(`Activitatea nu are deviz alocat. Cod: ${code}`);
        history.push("/devize");
        break;
      default:
        setAccess(1);
        break;
    }
  }

  useEffect(() => {
    const fetchParams: ITehnicFetchParams = {
      CodSal: account.CodSal,
      IdDecont: Number(id_deviz),
    };

    accessTehnic(account.token, fetchParams)
      .then((res) => HandleAcces(res.rezultat))
      .catch((err) => {
        console.log(err);
        alertError("A aparut o eroare la solicitarea drepturilor.");
      });
  }, []);

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-5 text-center">Meniu tehnic</h1>
        <p className="lead"></p>
        <hr className="my-4" />
        <div className="FLEX-CENTER">
          {access === "wait" ? (
            <Spinner />
          ) : (
            <>
              <button
                disabled={access === -1 || access === -2}
                onClick={() => history.push(`/raport/${id_deviz}`)}
                data-dismiss="modal"
                aria-label="Close"
                className="btn BTN-PROGRAM btn-primary btn shadow ml-3"
              >
                Chestionar & Constatari
              </button>
              <button
                disabled={access === -1 || access === -2 || access === -3}
                onClick={() => history.push(`/evenimente/${id_deviz}`)}
                data-dismiss="modal"
                aria-label="Close"
                className="btn BTN-PROGRAM btn-primary btn shadow ml-3"
              >
                Evenimente
              </button>
              <button
                disabled={access === -1 || access === -2}
                onClick={() => history.push(`/dateacces/${id_deviz}`)}
                data-dismiss="modal"
                aria-label="Close"
                className="btn BTN-PROGRAM btn-primary btn shadow ml-3"
              >
                Acces
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TehnicMenu;
