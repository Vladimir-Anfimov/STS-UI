import { handleError, handleResponse, apiURL } from "./utilsApi";
import { Constatare } from "../components/tehnic/TehnicConstatari";
import { IFetchEvenimenteParams } from "../components/tehnic/TehnicEvenimente";
import { Chestionar } from "../components/tehnic/TehnicChestionar";
import { IAccesData } from "../components/tehnic/TehnicAcces";

export interface ITehnicFetchParams {
  CodSal: number;
  IdDecont: number;
}

export function accessTehnic(
  token: string,
  params: ITehnicFetchParams
): Promise<any> {
  return fetch(apiURL + "/mentenanta/existadeviz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function incarcaEvenimente(
  token: string,
  params: IFetchEvenimenteParams
): Promise<any> {
  return fetch(apiURL + "/mentenanta/evenimente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function incarcaChestionar(
  token: string,
  params: ITehnicFetchParams
): Promise<any> {
  return fetch(apiURL + "/mentenanta/chestionar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function trimiteChestionar(
  token: string,
  chestionar: Chestionar[]
): Promise<any> {
  return fetch(apiURL + "/mentenanta/salveazachestionar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chestionar),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function incarcaConstatari(
  token: string,
  params: ITehnicFetchParams
): Promise<any> {
  return fetch(apiURL + "/mentenanta/const", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function trimiteConstatari(
  token: string,
  constatari: Constatare,
  params: ITehnicFetchParams
): Promise<any> {
  return fetch(apiURL + "/mentenanta/modconst", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...constatari, ...params }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function primesteDateAcces(
  token: string,
  IdDecont: number,
  CodSal: number
): Promise<any> {
  return fetch(apiURL + "/mentenanta/parole", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ IdDecont, CodSal }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function salveazaDateAcces(
  token: string,
  dateAcces: IAccesData
): Promise<any> {
  return fetch(apiURL + "/mentenanta/salveazaparole", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dateAcces),
  })
    .then(handleResponse)
    .catch(handleError);
}
