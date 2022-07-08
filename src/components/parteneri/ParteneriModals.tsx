import React from 'react';
import { useForm } from 'react-hook-form';
import { IAdaugaConversatie, IPersoanaDeLegatura, IPuncteLucru } from './Partner';

interface IAdaugaConversatieProps {
    persoane:IPersoanaDeLegatura[]
    handleAddConv: (conversatie: IAdaugaConversatie) => void
    loadingAddConv: boolean
}

export const AdaugaConversatie = ({persoane, handleAddConv, loadingAddConv}:IAdaugaConversatieProps) => {
    const {register, handleSubmit} = useForm<IAdaugaConversatie>();

    return (
        // @ts-ignore
        <div className="modal fade" id="exampleModal5" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"><b>Adauga o conversatie</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit(handleAddConv)}>
                <div className="form-group">
                    <label>Persoana</label>
                    <select ref={register} name="IdPersLeg" className="form-control">
                    {persoane.map((persoana:IPersoanaDeLegatura)=><option value={persoana.idPersLeg} key={persoana.idPersLeg}>{persoana.persoanaDeLegatura}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Detalii</label>
                    <textarea ref={register} name="Detalii" required className="form-control" rows={3}></textarea>
                </div>
                    
                <div className="text-center">
                    {
                        loadingAddConv ? (<button className="btn BTN-PROGRAM btn-primary btn shadow" disabled>Se adauga...</button>) : (<button className="btn BTN-PROGRAM btn-primary btn shadow">Adauga</button>)
                    }
                </div>
                </form>
            </div>
            </div>
            </div>
        </div>
        )
}

export const PuncteLucru = ({ puncteLucru }: {puncteLucru: IPuncteLucru[]}) => {
    return (
            // @ts-ignore
            <div className="modal fade" id="exampleModal20" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><b>Puncte de lucru</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <ul className="list-group">
                                    {puncteLucru.map((punctLucru:any)=>
                                        <li key={punctLucru.idPunctDeLucru} className="list-group-item">
                                            <b>{punctLucru.denumirePunctDeLucru}</b><br/>
                                        </li>
                                    )}
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }