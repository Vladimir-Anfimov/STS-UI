import React from 'react';
import Spinner from '../layout/Spinner';
import { PersoanaLegaturaDeviz } from './DevizBasic';

export const PersoaneLegaturaModal = ({ persoaneLegatura, persLoaded }: any) => {
    return (
        // @ts-ignore
        <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"><b>Persoane de legatura</b></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {persLoaded === true && persoaneLegatura.length === 0 ? (<b className='text-center'>Nu exista persoane de legatura.</b>) : (
                            persLoaded === false ? (<Spinner />) : (
                                <ul className="list-group">
                                    {persoaneLegatura.map((persoana: PersoanaLegaturaDeviz) => <li key={persoana.persoanaDeLegatura + Math.random()} className="list-group-item">
                                        {persoana.persoanaDeLegatura ? <><b>{persoana.persoanaDeLegatura}</b><br /></> : <></>}
                                        {persoana.telefon1 ? <><b>{persoana.telefon1}</b><br /></> : <></>}
                                        {persoana.telefon2 ? <><b>{persoana.telefon2}</b><br /></> : <></>}
                                    </li>)}
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}