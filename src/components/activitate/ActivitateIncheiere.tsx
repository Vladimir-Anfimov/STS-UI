import { jwtDecode } from "jwt-js-decode";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { stopActivitate } from "../../api/activitatiApi";
import { useAppDispatch } from "../../redux/hooks";
import { updateIsLoaded } from "../../redux/slices/ActivitatiSlice";
import AccountContext from "../../store/AccountStore";
import {
  alertError,
  AlertNotification,
  alertSuccess,
  alertWarning,
} from "../../utils/AlertTypes";
import { EvidentaActivitate } from "../activitati/ActivitatiTypes";
import { IncheiereActivateIcon } from "../deviz/DevizIcons";
import { IInputActivitate } from "./ActivitateTypes";

interface IProps {
  activitateInput: IInputActivitate;
  activitate: EvidentaActivitate;
}

export default function ActivitateIncheiere({
  activitateInput,
  activitate,
}: IProps) {
  const history = useHistory();
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  async function handleStopActivitate() {
    const observatiiLen = activitateInput.Observatii.length;
    const concluziiLen = activitateInput.Concluzii.length;

    if (observatiiLen === 0) {
      alertWarning("Va rugam sa completati campul cu activitatea prestata.");
      return;
    }
    if (observatiiLen >= 99) {
      alertWarning(
        "Campul cu activitatea prestata nu accepta mai mult de 100 de caractere."
      );
      return;
    }
    if (concluziiLen >= 499) {
      alertWarning(
        "Campul cu concluzii nu accepta mai mult de 500 de caractere."
      );
      return;
    }
    setLoading(true);
    try {
      const response = await stopActivitate(account.token, {
        ...activitateInput,
        CodSal: Number(jwtDecode(account.token).payload.id),
        IdDecont: activitate.idDeviz,
        IdTodo: activitate.idActivitate,
        ResponsabilActivitate: Number(activitate.responsabilActivitate),
      });
      console.log(response);
      dispatch(updateIsLoaded(false));
      AlertNotification("success", "Activitate incheiata cu succes.");
      history.push("/activitati");
    } catch (err) {
      alertError("A aparut o eroare la incheierea activitatii. " + err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleStopActivitate}
      className="btn btn-secondary btn-lg shadow"
      disabled={loading}
    >
      <IncheiereActivateIcon />
      Incheie activitate {loading && <>...</>}
    </button>
  );
}
