import { handleError, handleResponse, apiURL } from "./utilsApi";
import { ISearchParteneri } from "../store/ParteneriStore";
import { IAdaugaConversatie, IConversatiiSearchParams } from "../components/parteneri/Partner";
import { IAdaugaFoto } from "../components/multiused/AddImage";

export function cautaParteneri(token: string, cautare: ISearchParteneri): Promise<any> {
    return fetch(apiURL + '/partener/cauta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cautare)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function primestePartenerPersLegatura(token: string, CodPart: number): Promise<any> {
    return fetch(apiURL + '/partener/perslegpart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({CodPart})
    })
        .then(handleResponse)
        .catch(handleError)
}

export function primesteConversatiileCuPersDeLegatura(token: string, searchConvParams: IConversatiiSearchParams): Promise<any> {
    return fetch(apiURL + '/partener/contacte', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(searchConvParams)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function adaugaConversatieCuPartenerul(token: string, conversatie: IAdaugaConversatie) {
    return fetch(apiURL + '/partener/adaugacontact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(conversatie)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function adaugaImagineObiectiv(token: string, fotoParams: IAdaugaFoto ) {
    //@ts-ignore
    let data = new FormData()
    //@ts-ignore
    data.append('CodPart', fotoParams.CodPart)
    //@ts-ignore
    data.append('Observatii',fotoParams.Observatii)
    //@ts-ignore
    data.append('Imagine',fotoParams.Imagine)
    //@ts-ignore
    data.append('Latitudine',fotoParams.Latitudine)
    //@ts-ignore
    data.append('Longitudine',fotoParams.Longitudine)
    //@ts-ignore
    data.append('IdUtilizator',fotoParams.IdUtilizator)
    //@ts-ignore
    data.append('IdPunctDeLucru',fotoParams.IdPunctDeLucru)
    
    return fetch(apiURL + '/partener/adaugafoto', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
    })
        .then(handleResponse)
        .catch(handleError)
}

export function primestePartenerPuncteDeLucru(token: string, CodPart: number): Promise<any> {
    return fetch(apiURL + '/partener/punctelucru', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({CodPart})
    })
        .then(handleResponse)
        .catch(handleError)
}