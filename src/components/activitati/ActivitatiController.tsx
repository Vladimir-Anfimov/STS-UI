import React, { useEffect, useContext, ChangeEvent } from "react";
import "./kanban.css";
import Spinner from "../layout/Spinner";
import AccountContext from "../../store/AccountStore";
import { jwtDecode } from "jwt-js-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  updateActivitati,
  updateInterogare,
} from "../../redux/slices/ActivitatiSlice";
import { incarcaActivitati } from "../../api/activitatiApi";
import { alertError, AlertNotification } from "../../utils/AlertTypes";
import ActivitatiInterogare from "./ActivitatiInterogare";
import { useHistory } from "react-router-dom";
import ActivitatiKanban from "./ActivitatiKanban";
import { initializeDateActivitati } from "./ActivitatiFunctions";

export default function ActivitatiController() {
  const activitatiState = useAppSelector((state) => state.activitati);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { account } = useContext<any>(AccountContext);

  const onChangeInterogare = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateInterogare({
        ...activitatiState.interogare,
        [e.target.name]: new Date(e.target.value).toJSON(),
      })
    );
  };

  const onSubmitInterogare = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestListaActivitati();
  };

  async function requestListaActivitati(on_mount: boolean = false) {
    try {
      const response = await incarcaActivitati(account.token, {
        ...initializeDateActivitati(
          activitatiState.interogare.DeLa,
          activitatiState.interogare.PanaLa
        ),
        CodSal: Number(jwtDecode(account.token).payload.id),
      });
      dispatch(updateActivitati(response.activitati));
      if (!on_mount)
        AlertNotification("success", "Activitatile au fost incarcate.");
    } catch (err) {
      alertError(`A aparut o eroare la incarcarea activitatilor. ${err}`);
    }
  }

  useEffect(() => {
    if (!activitatiState.isLoaded) {
      requestListaActivitati(true);
      return;
    }

    if (
      activitatiState.activitati.length === 1 &&
      activitatiState.activitati[0].idActivitateInceputa !== 0
    )
      history.push(`/activitati/${activitatiState.activitati[0].idActivitate}`);
  }, [activitatiState]);

  if (activitatiState.isLoaded === false)
    return (
      <div className="text-center mt-5">
        <Spinner />
        <br />
        <h4>Se incarca..</h4>
      </div>
    );

  return (
    <div className="jumbotron mt-4">
      <ActivitatiInterogare
        isLoaded={activitatiState.isLoaded}
        onSubmitInterogare={onSubmitInterogare}
        interogare={activitatiState.interogare}
        onChangeInterogare={onChangeInterogare}
      />
      <ActivitatiKanban />
    </div>
  );
}
