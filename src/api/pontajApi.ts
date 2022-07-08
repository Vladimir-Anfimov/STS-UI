import { handleError, handleResponse, apiURL } from "./utilsApi";
import { Operatiune } from "../components/pontaj/PontajController";

export function starePontaj(token: string, codSal: number): Promise<any> {
    return fetch(apiURL + '/pontaj/stare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({codSal})
    })
        .then(handleResponse)
        .catch(handleError)
}

export function trimiteStareOperatiune(token: string, operatiune: Operatiune): Promise<any> {
    return fetch(apiURL + '/pontaj/operatiuni', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(operatiune)
    })
        .then(handleResponse)
        .catch(handleError)
}