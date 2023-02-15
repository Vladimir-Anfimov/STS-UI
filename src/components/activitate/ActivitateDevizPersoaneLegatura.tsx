import React, { useContext, useState } from "react";
import { primestePersLegaturaDeviz } from "../../api/devizeApi";
import AccountContext from "../../store/AccountStore";
import { alertError } from "../../utils/AlertTypes";
import { EvidentaDeviz } from "../activitati/ActivitatiTypes";
import { PersoanaLegaturaDeviz } from "../deviz/DevizTypes";
import { PersoaneLegaturaModal } from "../deviz/PersoaneLegaturaModal";

interface IProps {
  deviz: EvidentaDeviz;
}

export default function ActivitateDevizPersoaneLegatura({ deviz }: IProps) {
  const { account } = useContext<any>(AccountContext);
  const [persoaneLegatura, setPersoaneLegatura] = useState<
    PersoanaLegaturaDeviz[]
  >([]);
  const [persLoaded, setPersLoaded] = useState<boolean>(false);

  function LoadPersoaneLegatura() {
    if (persLoaded === false) {
      primestePersLegaturaDeviz(account.token, deviz.idDeviz)
        .then((res) => {
          setPersoaneLegatura(res.persleg);
        })
        .catch(() =>
          alertError("A aparut o eroare la incarcarea persoanelor de legatura.")
        )
        .finally(() => setPersLoaded(true));
    }
  }
  return (
    <>
      {" "}
      <button
        data-backdrop="false"
        data-toggle="modal"
        data-target="#exampleModal3"
        onClick={LoadPersoaneLegatura}
        className="btn btn-primary shadow col-lg-3 col-10 "
      >
        Persoane legatura
      </button>
      <PersoaneLegaturaModal
        persoaneLegatura={persoaneLegatura}
        persLoaded={persLoaded}
      />
    </>
  );
}
