import { IZonaDepozitare } from "../components/produse/ActualizareZonaDepozitare";
import { IProdus } from "../components/produse/ProduseController";
import { ICautareProduse } from "../components/produse/ProduseController";
import { handleError, handleResponse, apiURL } from "./utilsApi";

export function produseCautare(
  token: string,
  cautare: ICautareProduse
): Promise<{ stoc: IProdus[] }> {
  return fetch(apiURL + "/stoc/cautareprodus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cautare),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function actualizareZonaDepozitare(
  token: string,
  actualizare: IZonaDepozitare
): Promise<{ rezultat: number }> {
  return fetch(apiURL + "/stoc/zonadepozitare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(actualizare),
  })
    .then(handleResponse)
    .catch(handleError);
}
