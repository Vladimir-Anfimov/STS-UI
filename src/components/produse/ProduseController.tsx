import React, { useContext, useState } from "react";
import { produseCautare } from "../../api/produseApi";
import AccountContext from "../../store/AccountStore";
import { alertError, alertWarning } from "../../utils/AlertTypes";
import { SearchIcon } from "../../utils/Icons";
import { actualizeazaZonaDeDepozitarePopUp } from "./ActualizareZonaDepozitare";
import ProduseList from "./ProduseList";
import ProdusePaginare, { IDirectiePaginare } from "./ProdusePaginare";

export interface ICautareProduse {
  CodSal: number;
  CriteriuCautare: number;
  SirCautat: string;
  InregistrariPePagina: number;
  NumarPagina: number;
}

export interface IProdus {
  numarCurent: number;
  codProdus: string;
  denumireProdus: string;
  unitMas: string;
  cantitateDisponibila: number;
  zonaDepozitare: string;
}

function ProduseController() {
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(false);
  const [produse, setProduse] = useState<IProdus[]>([]);
  const [cautare, setCautare] = useState<ICautareProduse>({
    CodSal: account.CodSal,
    CriteriuCautare: 3,
    InregistrariPePagina: 10,
    NumarPagina: 1,
    SirCautat: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCautare({
      ...cautare,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setCautare({
      ...cautare,
      [e.target.name]: Number(e.target.value),
    });
  }

  async function updatePagina(directie: IDirectiePaginare) {
    console.log(`Pagina ${cautare.NumarPagina} directie ${directie}`);
    const paginaNoua = cautare.NumarPagina + directie;
    if (paginaNoua === 0) {
      alertWarning("Sunteti pe prima pagina, nu exista altele anterioare.");
      return;
    }
    const _produse = await cautareProduse(paginaNoua);
    if (_produse.length === 0) {
      alertWarning("Nu mai exista alte pagini urmatoare.");
      return;
    }
    setProduse(_produse);
    setCautare({ ...cautare, NumarPagina: cautare.NumarPagina + directie });
  }

  async function cautareProduse(NumarPagina: number = 1): Promise<IProdus[]> {
    if (cautare.SirCautat.trim() === "") {
      alertWarning("Introduceti un text pentru cautare.");
      throw new Error();
    }

    try {
      setLoading(true);
      const response = await produseCautare(account.token, {
        ...cautare,
        NumarPagina,
      });
      return response.stoc;
    } catch (err) {
      alertError("A aparut o eroare la incarcarea produselor.");
      console.log(err);
    } finally {
      setLoading(false);
    }
    throw new Error();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCautare({ ...cautare, NumarPagina: 1 });
    try {
      const _produse = await cautareProduse();
      setProduse(_produse);
    } catch {}
  }

  async function HandleClickProdus(produsActualizat: IProdus) {
    try {
      const { zonaNouaConfirmata, confirmat } =
        await actualizeazaZonaDeDepozitarePopUp(
          account.token,
          produsActualizat
        );
      if (confirmat === false) return;
      const _produse = produse.map((prod) => {
        if (prod.codProdus === produsActualizat.codProdus)
          prod.zonaDepozitare = zonaNouaConfirmata;
        return prod;
      });
      setProduse(_produse);
    } catch {
      alertError("Eroare la actualizare.");
    }
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-4">Produse</h1>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Cautare dupa...</label>
            <select
              name="CriteriuCautare"
              className="form-control"
              id="exampleFormControlSelect1"
              value={cautare.CriteriuCautare}
              onChange={handleChangeSelect}
            >
              <option value={3}>Denumire produs</option>
              <option value={1}>Cod bara</option>
              <option value={2}>Cod produs</option>
              <option value={4}>Categorie produs</option>
              <option value={5}>Producator</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Produse pe pagina</label>
            <select
              name="InregistrariPePagina"
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={handleChangeSelect}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="form-group">
            <input
              disabled={loading}
              placeholder="Text cautare..."
              autoComplete="off"
              name="SirCautat"
              type="text"
              onChange={handleChange}
              className="form-control"
              required
            />
            <small className="form-text text-muted">
              Va rugam inserati aici datele pentru cautare.
            </small>
          </div>
          <button
            disabled={loading}
            className="btn BTN-PROGRAM btn-primary btn-lg shadow"
          >
            <SearchIcon />
            Cauta
          </button>
        </form>
        {/* AICI LISTA */}
        <ProduseList
          loading={loading}
          onClick={HandleClickProdus}
          produse={produse}
        />
        {produse.length > 0 && (
          <ProdusePaginare
            pagina={cautare.NumarPagina}
            updatePagina={updatePagina}
          />
        )}
      </div>
    </div>
  );
}

export default ProduseController;
