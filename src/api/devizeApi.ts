import { handleError, handleResponse, apiURL } from "./utilsApi";
import {
  IFilterGPS,
  IncarcaDevize,
} from "../components/devize/DevizeController";
import { Deviz } from "../store/DevizeStore";
import {
  IStartAct,
  IStopAct,
  IUpdateCoordonate,
} from "../components/deviz/DevizBasic";
import {
  IProdus,
  ITransferProdusAPI,
} from "../components/deviz/ProductScanner";

export function incarcaDevize(
  token: string,
  incarcaDevize: IncarcaDevize
): Promise<{ devize: Deviz[] }> {
  return fetch(apiURL + "/devize/incarca", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(incarcaDevize),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function incarcaDevizeGPS(
  token: string,
  incarcaDevize: IncarcaDevize,
  GPSData: IFilterGPS
): Promise<{ devize: Deviz[] }> {
  console.log(GPSData);
  return fetch(apiURL + "/devize/incarcagps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...incarcaDevize,
      ...GPSData,
      RazaCautareKm: Number(GPSData.RazaCautareKm),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function startActivitate(
  token: string,
  startAct: IStartAct
): Promise<any> {
  return fetch(apiURL + "/devize/startact", {
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

export function stopActivitate(token: string, stopAct: IStopAct): Promise<any> {
  console.log(stopAct);
  return fetch(apiURL + "/devize/stopact", {
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

export function primestePersLegaturaDeviz(
  token: string,
  IdDeviz: number
): Promise<any> {
  return fetch(apiURL + "/partener/perslegdeviz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ IdDeviz }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function modificaCoordonate(
  token: string,
  updCoord: IUpdateCoordonate
): Promise<any> {
  return fetch(apiURL + "/partener/coorddeviz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updCoord),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function transferaProdus(
  token: string,
  produs: ITransferProdusAPI
): Promise<{ rezultat: { codSP: number; mesajSP: string } }> {
  return fetch(apiURL + "/devize/transferprodus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(produs),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function incarcaProduse(
  token: string,
  IDDecont: number
): Promise<{ rezultat: IProdus[] }> {
  return fetch(apiURL + "/devize/matconsdev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ IDDecont }),
  })
    .then(handleResponse)
    .catch(handleError);
}
