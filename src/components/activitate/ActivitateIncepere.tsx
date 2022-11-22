import { jwtDecode } from "jwt-js-decode";
import React, { useContext, useState } from "react";
import { startActivitate } from "../../api/activitatiApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateActivitati } from "../../redux/slices/ActivitatiSlice";
import AccountContext from "../../store/AccountStore";
import { alertError, AlertNotification } from "../../utils/AlertTypes";
import { EvidentaActivitate } from "../activitati/ActivitatiTypes";
import { StartActivateIcon } from "../deviz/DevizIcons";

interface IProps {
  activitate: EvidentaActivitate;
}

export default function ActivitateIncepere({ activitate }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { account } = useContext<any>(AccountContext);
  const { activitati } = useAppSelector((state) => state.activitati);
  const dispatch = useAppDispatch();

  async function handleStartActivitate() {
    setLoading(true);
    try {
      const response = await startActivitate(account.token, {
        CodSal: Number(jwtDecode(account.token).payload.id),
        IdDecont: activitate.idDeviz,
        IdTodo: activitate.idActivitate,
      });
      console.log(response);
      let _activitate = activitati.find(
        (x) => x.idActivitate === activitate.idActivitate
      );
      if (_activitate === undefined)
        throw `Nu exista activitea cu id-ul ${activitate.idActivitate}`;
      dispatch(
        updateActivitati([
          { ..._activitate, idActivitateInceputa: response.idActivitate },
        ])
      );
      AlertNotification("success", "Activitate inceputa cu succes.");
    } catch (err) {
      alertError("A aparut o eroare la inceperea activitatii. " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleStartActivitate}
        disabled={loading}
        className="btn btn-primary btn-lg shadow"
      >
        <StartActivateIcon />
        Incepere activitate {loading && <>...</>}
      </button>
    </>
  );
}
