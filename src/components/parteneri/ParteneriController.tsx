import React, { useState, useContext } from "react";
import AccountContext from "../../store/AccountStore";
import { alertError } from "../../utils/AlertTypes";
import { cautaParteneri } from "../../api/parteneriApi";
import ParteneriList from "./ParteneriList";
import Spinner from "../layout/Spinner";
import ParteneriContext from "../../store/ParteneriStore";
import { SearchIcon } from "../../utils/Icons";

function ParteneriController() {
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { parteneriState, search, changeParteneriState } =
    useContext<any>(ParteneriContext);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    changeParteneriState(undefined, {
      ...search,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    cautaParteneri(account.token, {
      ...search,
      TipCautare: Number(search.TipCautare),
    })
      .then((res) => changeParteneriState(res.parteneri))
      .catch((err) => {
        alertError("A aparut o eroare la incarcarea partenerilor.");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-4">Parteneri</h1>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Cautare dupa...</label>
            <select
              name="TipCautare"
              onChange={handleChange}
              value={search.TipCautare}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value={2}>Denumire firma</option>
              <option value={1}>CUI</option>
              <option value={3}>Telefon</option>
            </select>
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              onChange={handleChange}
              value={search.SirCautare}
              name="SirCautare"
              type="text"
              className="form-control"
              required
            />
            <small className="form-text text-muted">
              Va rugam inserati aici datele pentru cautare.
            </small>
          </div>
          <button className="btn BTN-PROGRAM btn-primary btn-lg shadow">
            <SearchIcon />
            Cauta
          </button>
        </form>
        {loading ? <Spinner /> : <ParteneriList parteneri={parteneriState} />}
      </div>
    </div>
  );
}

export default ParteneriController;
