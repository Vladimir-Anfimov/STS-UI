import {
  IIncepeActivitate,
  IInchideActivitate,
} from "../components/activitate/ActivitateTypes";
import {
  EvidentaActivitate,
  IInterogareActivitati,
} from "../components/activitati/ActivitatiTypes";
import { apiURL, handleError, handleResponse } from "./utilsApi";

export function incarcaActivitati(
  token: string,
  interogareActivitati: IInterogareActivitati
): Promise<{ activitati: EvidentaActivitate[] }> {
  return fetch(apiURL + "/activitati/incarca", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(interogareActivitati),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function startActivitate(
  token: string,
  startAct: IIncepeActivitate
): Promise<{ idActivitate: number }> {
  return fetch(apiURL + "/activitati/startact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(startAct),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function stopActivitate(
  token: string,
  stopAct: IInchideActivitate
): Promise<{ rezultat: number }> {
  console.log(stopAct);
  return fetch(apiURL + "/activitati/stopact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(stopAct),
  })
    .then(handleResponse)
    .catch(handleError);
}
