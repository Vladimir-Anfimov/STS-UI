import { handleError, handleResponse, apiURL } from "./utilsApi";
import {Account} from '../components/login/LoginController';

export function loginUtilizator<T>(data_login: Account): Promise<{token: string}> {
    return fetch(apiURL + '/securitate/logare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data_login }),
    })
        .then(handleResponse)
        .catch(handleError)
}

export function verifyToken<T>(token: string): Promise<any> {
    return fetch(apiURL + '/pontaj/stare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response=> response.status)
        .catch(handleError)
}