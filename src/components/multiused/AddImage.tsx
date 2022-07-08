import React, {useContext, useState, useEffect} from 'react';
import AccountContext from '../../store/AccountStore';
import { jwtDecode } from "jwt-js-decode";
import { alertError, alertSuccess, alertWarning } from '../../utils/AlertTypes';
import { adaugaImagineObiectiv } from '../../api/parteneriApi';
import { IPuncteLucru } from '../parteneri/Partner';

export interface IAdaugaFoto {
    CodPart: number
    Observatii: string
    Imagine: File | null
    Latitudine: number
    Longitudine: number
    IdUtilizator: number
    IdPunctDeLucru: number
}

interface Props {
    CodPart: number
    IdPunctDeLucru: number
    puncteLucru?: IPuncteLucru[]
}

export const AddImage = ({CodPart, IdPunctDeLucru, puncteLucru = []}:Props) => {
    const { account }: any = useContext(AccountContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [foto, setFoto] = useState<IAdaugaFoto>({
        CodPart:CodPart,
        IdPunctDeLucru:IdPunctDeLucru,
        Observatii: "",
        Imagine:null,
        Latitudine:0,
        Longitudine:0,
        IdUtilizator: Number(jwtDecode(account.token).payload.id)
    });

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position: any) => {
                setFoto({...foto, Latitudine: position.coords.latitude, Longitudine: position.coords.longitude})
            })
        } 
        else alertError("A aparut o eroare de la geolocatie.")
    }, [])

    const handleChangeFile = (e: any) => {
        const file = e.target.files[0]
        setFoto({...foto, Imagine: file});
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(IdPunctDeLucru === -1) alertError("Id-ul punctului de lucru este -1, fapt ce determina existenta unei erori in cod.")
        else if(foto.Imagine === null) alertWarning("Va rugam sa reselectati o imagine.")
        else {
        setLoading(true)
        adaugaImagineObiectiv(account.token, foto)
        .then(res=>{
            console.log(res, foto)
            setFoto({...foto, Imagine: null, Observatii: ""})
            alertSuccess("Imaginea a fost incarcata.")
        })
        .catch(()=>alertError("A aparut o eroare la incarcarea imaginii"))
        .finally(()=>setLoading(false))
        }
    }

    return (
        // @ts-ignore
        <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"><b>Incarca o imagine</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Longitudine</label>
                        <input value={foto.Longitudine} className="form-control text-center" disabled required/>
                    </div>
                    <div className="form-group">
                    <label>Latitudine</label>
                        <input value={foto.Latitudine} className="form-control text-center" disabled required/>
                    </div>
                    {
                        puncteLucru.length > 0 && <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Punct de lucru</label>
                            <select onChange={(e)=>setFoto({...foto, IdPunctDeLucru: Number(e.target.value)})} defaultValue={IdPunctDeLucru} className="form-control">
                                {puncteLucru?.map((punctLucru:any)=>(
                                    <option value={punctLucru.idPunctDeLucru} key={punctLucru.idPunctDeLucru}>
                                        {punctLucru.denumirePunctDeLucru}
                                    </option>
                                ))}
                            </select>
                    </div>
                    }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        <span className="input-group-text">Incarca</span>
                        </div>
                        <div className="custom-file">
                            <input onChange={handleChangeFile} type="file" className="custom-file-input" id="inputGroupFile01" required/>
                            <label className="custom-file-label text-center" htmlFor="inputGroupFile01">{
                                foto.Imagine !== null && <span className="text-center">{foto.Imagine.name}</span>
                            }</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea autoComplete="off" required onChange={(e)=>setFoto({...foto, Observatii: e.target.value})} value={foto.Observatii} rows={3} className="form-control" id="exampleInputPassword1" placeholder="Observatii"/>
                    </div>
                    <div className="text-center">
                        <button disabled={loading} className="btn btn-primary">{loading === false ? <span>Incarca</span> : <span>Se incarca...</span>}</button>
                    </div>
                    <div className="alert alert-success" role="alert">
                        Incarcarea imaginii s-ar putea sa necesite timp, va rugam sa asteptati dupa selectarea acesteia.
                    </div>
                </form>
            </div>
            </div>
            </div>
        </div>
        )
}