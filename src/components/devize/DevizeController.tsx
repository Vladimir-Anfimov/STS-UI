import React, { useEffect, useContext, useState } from 'react'
import AccountContext from '../../store/AccountStore';
import PontajContext from '../../store/PontajStore';
import { jwtDecode } from "jwt-js-decode";
import { incarcaDevize, incarcaDevizeGPS } from '../../api/devizeApi';
import { Deviz } from '../../store/DevizeStore';
import { alertError, alertWarning } from '../../utils/AlertTypes';
import DevizeContext from '../../store/DevizeStore';
import Spinner from '../layout/Spinner';
import DevizeList from './DevizeList'
import DevizTemporaryStateContext from '../../store/DevizStore';
import showGelocationError from '../../utils/GeolocationErrors';

export interface IncarcaDevize {
    CodSal: number
    Status: number
    TipLucrare: number
}

export interface IFilterGPS {
    LatitudineEchipaj: number
    LongitudineEchipaj: number
    RazaCautareKm: string // mentinuta in format string pt ca inputul sa poate afisa un text gol
}

interface Filter {
    Status: number
    TipLucrare: number
}

function DevizeController({ history }: any) {
    const { account } = useContext<any>(AccountContext);
    const { pontajState }: any = useContext(PontajContext)
    const { setDevizTemporaryState }: any = useContext(DevizTemporaryStateContext)
    const { devizeState, changeDevizejState }: any = useContext(DevizeContext);
    const [loadingCautare, setLoadingCautare] = useState<boolean>(false);
    const [razaGPS, setRazaGPS] = useState<string>("")
    const [checkboxRaza, setCheckboxRaza] = useState<boolean>(false);
    const [filter, setFilter] = useState<Filter>({
        Status: 0,
        TipLucrare: 9
    })


    function LoadDevizeByCriteria() {
        if(checkboxRaza && Number(razaGPS) <= 0) {
            alertWarning(`Raza de cautare trebuie sa fie mai mare decat 0. 
                          Daca nu vreti sa luati raza in considerare va rog
                          debifati checkbox-ul din stanga.     
                    `)
            return;
        }

        setLoadingCautare(true);
        const filterBasic: IncarcaDevize = {
            CodSal: Number(jwtDecode(account.token).payload.id),
            Status: filter.Status,
            TipLucrare: filter.TipLucrare
        }

        if(checkboxRaza) {
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                const filterGPS: IFilterGPS = {
                    LatitudineEchipaj: position.coords.latitude,
                    LongitudineEchipaj: position.coords.longitude,
                    RazaCautareKm: razaGPS
                }
                incarcaDevizeGPS(account.token, filterBasic, filterGPS)
                .then((res: { devize: Deviz[] }) => changeDevizejState(res.devize))
                .catch((err: any) => {
                    alertError("A aparut o eroare la incarcarea devizelor.")
                    console.log(err)
                })
                .finally(() => setLoadingCautare(false))
            }, showGelocationError, {enableHighAccuracy: true})
        } 
        else alertError("A aparut o eroare de la geolocatie.")
        }
        else {
            incarcaDevize(account.token, filterBasic)
                .then((res: { devize: Deviz[] }) => changeDevizejState(res.devize))
                .catch((err: any) => {
                    alertError("A aparut o eroare la incarcarea devizelor.")
                    console.log(err)
                })
                .finally(() => setLoadingCautare(false))
        }
    }

    useEffect(() => {
        if (devizeState.devize !== null && devizeState.loadedDevize === true && devizeState.devize.length === 1 && devizeState.devize[0].idActivitateInceputa != 0) {
            history.push("/devize/" + devizeState.devize[0].idDeviz)
        } else setDevizTemporaryState({ Observatii: "", Concluzii: "" })
    }, [devizeState.devize])

    useEffect(() => {
        if (account.valid === true && pontajState !== null && devizeState.loadedDevize === false) LoadDevizeByCriteria()
    }, [pontajState])

    if (devizeState.loadedDevize === false && devizeState.devize.length === 0) return <Spinner />
    else return (
        <div className="container">
            <div className="jumbotron mt-4">
                <div className="row text-center">
                    <div className="dropdown col-12">
                        <button className="btn btn-primary btn-sm dropdown-toggle BTN-PROGRAM" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button onClick={() => setFilter({ ...filter, Status: 0 })} className={filter.Status === 0 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Toate</button>
                            <button onClick={() => setFilter({ ...filter, Status: 1 })} className={filter.Status === 1 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Neinceputa</button>
                            <button onClick={() => setFilter({ ...filter, Status: 2 })} className={filter.Status === 2 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">In desfasurare</button>
                            <button onClick={() => setFilter({ ...filter, Status: 4 })} className={filter.Status === 4 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Planificata</button>
                        </div>
                    </div>

                    <div className="dropdown col-12">
                        <button className="btn btn-primary btn-sm dropdown-toggle BTN-PROGRAM" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Tip lucrare
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <button onClick={() => setFilter({ ...filter, TipLucrare: 9 })} className={filter.TipLucrare === 9 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Toate</button>
                            <button onClick={() => setFilter({ ...filter, TipLucrare: 0 })} className={filter.TipLucrare === 0 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Lucrare noua</button>
                            <button onClick={() => setFilter({ ...filter, TipLucrare: 1 })} className={filter.TipLucrare === 1 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Extindere</button>
                            <button onClick={() => setFilter({ ...filter, TipLucrare: 2 })} className={filter.TipLucrare === 2 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Service</button>
                            <button onClick={() => setFilter({ ...filter, TipLucrare: 3 })} className={filter.TipLucrare === 3 ? "dropdown-item btn-primary" : ("dropdown-item")} type="button">Mentenenta</button>
                        </div>
                    </div>

                    <div className="input-group m-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input 
                                    checked={checkboxRaza} 
                                    type="checkbox" 
                                    onChange={()=>setCheckboxRaza(!checkboxRaza)}
                                    aria-label="Checkbox for following text input" 
                                />
                            </div>
                        </div>
                        <input 
                            value={razaGPS}
                            onChange={(e)=>setRazaGPS(e.target.value)} 
                            className="form-control" 
                            placeholder='Treceti raza in km' 
                            type="number"
                            disabled={!checkboxRaza} 
                        />
                    </div>

                    <div className="col-12">
                        <button onClick={() => LoadDevizeByCriteria()} className="btn btn-secondary BTN-PROGRAM" disabled={loadingCautare}>
                            {loadingCautare ? "Se cauta..." : "Cauta"}
                        </button>
                    </div>
                </div>
                <DevizeList />
            </div>
        </div>
    )
}

export default DevizeController