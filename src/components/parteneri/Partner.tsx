import React, { useEffect, useState, useContext } from 'react';
import { primestePartenerPersLegatura, primesteConversatiileCuPersDeLegatura, adaugaConversatieCuPartenerul, primestePartenerPuncteDeLucru } from '../../api/parteneriApi';
import AccountContext from '../../store/AccountStore';
import { alertError, alertSuccess, alertWarning } from '../../utils/AlertTypes';
import { FotoIcon } from '../deviz/DevizIcons';
import Spinner from '../layout/Spinner';
import { AddImage } from '../multiused/AddImage';
import PartenerConversatiiList from './PartenerConversatiiList';
import { AdaugaConversatie, PuncteLucru } from './ParteneriModals';

export interface IPersoanaDeLegatura {
        email: string
        functia: string
        idPersLeg: number
        persoanaDeLegatura: string
        telefon1: string
        telefon2: string
}

// mod afisare => 0 toate conv, 1 pt o persoana, -1 nu arata nimic
export interface IConversatiiSearchParams {
    ModAfisare:number
    ParametruAfisare:number
}

export interface IConversatieParteneri {
    idDeta: number
    persoanaDeLegatura: string
    dataContact: string
    detalii: string
}

export interface IAdaugaConversatie {
    IdPersLeg: number 
    Detalii: string
}

export interface IPuncteLucru {
    idPunctDeLucru: number
    denumirePunctDeLucru:string
}

function Partener({match}: any){
    // persoane = persoane de legauta pt prescurtare
    const [persoane, setPersoane] = useState<IPersoanaDeLegatura[]>([]);
    const [loadingPersoane, setLoadingPersoane] = useState<boolean>(true);
    const [convSearchParams, setConvSearchParams] = useState<IConversatiiSearchParams>({
        ModAfisare: -1,
        ParametruAfisare:-1
    })
    const [conversatii, setConversatii] = useState<IConversatieParteneri[]>([]);
    const { account } = useContext<any>(AccountContext);
    const [loadingAddConv, setLoadingAddConv] = useState<boolean>(false);
    const [puncteLucru, setPuncteLucru] = useState<IPuncteLucru[]>([]);

    useEffect(()=>{
        primestePartenerPersLegatura(account.token, Number(match.params.cod_part))
        .then(res=>setPersoane(res.persleg))
        .catch(()=>alertError("Nu exista partenerul cautat."))
        .finally(()=>setLoadingPersoane(false))

        primestePartenerPuncteDeLucru(account.token, Number(match.params.cod_part))
        .then(res=> setPuncteLucru(res.punctelucru))
        .catch((err:any)=>{
            alertError("A aparut o eroare la returnearea punctelor de lucru.")
            console.log(err)
        })

    }, [])

    // ruleaza cand se schimba parametrii de cautare pt discutie
    useEffect(()=>{
        if(convSearchParams.ModAfisare !== -1 && convSearchParams.ParametruAfisare !== -1){
            primesteConversatiileCuPersDeLegatura(account.token, convSearchParams)
            .then(res=>{
                setConversatii(res.persleg);
                if(res.persleg.length === 0) alertWarning("Nu exista conversatii anterioare.");
            })
            .catch(err=>{
                alertError("A aparut o eroare de server.")
                console.log(err)
            })
        }
    }, [convSearchParams])

    function handleAddConv(conversatie: IAdaugaConversatie){
        setLoadingAddConv(true);
        adaugaConversatieCuPartenerul(account.token, {...conversatie, IdPersLeg: Number(conversatie.IdPersLeg)})
        .then(res=>{
            if(res.rezultat == 0) {
                alertSuccess("Conversatie adaugata cu succes.")
                setConvSearchParams({
                    ModAfisare: 1,
                    ParametruAfisare: Number(conversatie.IdPersLeg)
                })
            } else throw new Error();
        })
        .catch(err=>{
            console.log(err)
            alertError("A aparut o eroare la adaugarea conversatiei.")
        })
        .finally(()=>setLoadingAddConv(false))
    }

    if(loadingPersoane === true) return <Spinner />
    else if(persoane.length === 0) return <div className="container text-center"><div className="alert alert-primary" role="alert">Nu exista persoane de legatura.</div></div>
    return (
        <div className="container">
            <div className="jumbotron mt-4">
           <div className="text-center mb-3">
                <button onClick={()=>setConvSearchParams({ModAfisare:0, ParametruAfisare:Number(match.params.cod_part)})} className="btn BTN-PROGRAM btn-primary btn shadow">Afiseaza Toate conversatiile</button>
                <button data-backdrop="false" data-toggle="modal" data-target="#exampleModal5" className="btn BTN-PROGRAM btn-secondary btn shadow">Adauga o conversatie</button>
                <button data-backdrop="false" data-toggle="modal" data-target="#exampleModal20" className="btn BTN-PROGRAM btn-primary btn shadow">Puncte de lucru</button>
                <button data-backdrop="false" data-toggle="modal" data-target="#exampleModal2" className="btn BTN-PROGRAM p-2 btn-secondary shadow"><FotoIcon/> Adauda foto</button>
           </div>
            <ul className="list-group">
            {persoane.map((persoana:IPersoanaDeLegatura)=>
            <li onClick={()=>setConvSearchParams({ModAfisare:1, ParametruAfisare:Number(persoana.idPersLeg)})} style={{cursor:"pointer"}} key={persoana.persoanaDeLegatura + Math.random()} className="list-group-item shadow">
                <b>{persoana.persoanaDeLegatura}</b><br/>
                {persoana.telefon1 ? <><b>{persoana.telefon1}</b><br/></> : <></>}
                 {persoana.telefon2 ? <><b>{persoana.telefon2}</b><br/></> : <></>}
                  {persoana.email ? <><b>{persoana.email}</b><br/></> : <></>}
                   {persoana.functia ? <><b>{persoana.functia}</b><br/></> : <></>}
            </li>)}
            </ul>
            <PartenerConversatiiList conversatii={conversatii} />
            </div>
            <AdaugaConversatie loadingAddConv={loadingAddConv} handleAddConv={handleAddConv} persoane={persoane}/>
             <AddImage puncteLucru={puncteLucru} IdPunctDeLucru={puncteLucru[0] !== undefined ? puncteLucru[0].idPunctDeLucru : -1} CodPart={Number(match.params.cod_part)} />
            <PuncteLucru puncteLucru={puncteLucru}/>
        </div>
    )
}

export default Partener;