import { IInterogareActivitati } from "../components/activitati/ActivitatiController";
import { EvidentaActivitati } from "../components/activitati/ActivitatiTypes";
import { apiURL, handleError, handleResponse } from "./utilsApi";

export function incarcaActivitati(
  token: string,
  interogareActivitati: IInterogareActivitati
): Promise<{ activitati: EvidentaActivitati[] }> {
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