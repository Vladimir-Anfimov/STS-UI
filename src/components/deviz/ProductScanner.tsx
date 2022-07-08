import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { transferaProdus, incarcaProduse } from "../../api/devizeApi";
import AccountContext from "../../store/AccountStore";
import {
  alertError,
  alertSuccess,
  alertWarning,
  Toast,
} from "../../utils/AlertTypes";
import BarcodeComponent from "./BarcodeComponent";
import { jwtDecode } from "jwt-js-decode";
import { useHistory, useParams } from "react-router-dom";
import { ProductsModal } from "./ProductsModal";

export interface ITransferProdusAPI {
  CodSal: number;
  IdDecont: number;
  TransferClient: 1 | 0;
  CodBara: string;
  Cantitate: number;
}

interface ITransferProdusUI {
  TransferClient: 1 | 0;
  CodBara: string;
  Cantitate: string;
}

const PRODUS_INIT_VALS: ITransferProdusUI = {
  TransferClient: 1,
  CodBara: "",
  Cantitate: "1",
};

export interface IProdus {
  codProdus: string;
  produs: string;
  utilizat: number;
  unitMas: string;
}

const ProductScanner = () => {
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(false);
  const [cameraId, setCameraId] = useState("");
  const [devices, setDevices] = useState<any>([]);
  const [produs, setProdus] = useState<ITransferProdusUI>(PRODUS_INIT_VALS);
  const [scanat, setScanat] = useState(false);
  const { id_deviz } = useParams<{ id_deviz: string }>();
  const history = useHistory();
  const [produse, setProduse] = useState<IProdus[]>([]);
  const [loadingProduse, setLoadingProduse] = useState(true);

  useEffect(() => {
    getDevices();
  }, []);

  async function getDevices() {
    //@ts-ignore
    let status = await navigator.permissions.query({ name: "camera" });

    if (status.state == "prompt") {
      try {
        const response = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        //@ts-ignore
        status = await navigator.permissions.query({ name: "camera" });
      } catch (err) {
        alertError("A aparut o eroare la cererea permisiunii pentru camera.");
      }
    }
    if (status.state == "denied") {
      alertError(
        "Nu ati acordat permisiunea la camera. Va rugam sa setati permisiunea Allow in browser pentru camera."
      );
      return;
    }

    const _devices = (await navigator.mediaDevices.enumerateDevices()).filter(
      (dev) => dev.deviceId !== "" && dev.label !== ""
    );
    console.log(_devices);
    setDevices(_devices);
  }

  const BarCodeOnUpdate = (err: any, result: any) => {
    if (result) {
      console.log(result, scanat);
      setProdus({ ...produs, CodBara: result.text });
      setScanat(true);
      Toast.fire({
        icon: "success",
        title: `A fost scanat codul: ${result.text}`,
      });
    }
  };

  function handleChangeTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    setProdus({ ...produs, [e.target.name]: e.target.value });
  }

  function handleChangeRadioButton(e: React.ChangeEvent<HTMLInputElement>) {
    setProdus({
      ...produs,
      TransferClient: produs.TransferClient === 1 ? 0 : 1,
    });
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const _cantitate = produs.Cantitate.trim();

    if (_cantitate === "") {
      alertWarning("Campul 'cantitate' este obligatoriu.");
      return;
    }
    if (isNaN(Number(_cantitate))) {
      alertWarning("Campul 'cantitate' nu contine un numar valid.");
      return;
    }
    if (Number(_cantitate) <= 0) {
      alertWarning("Campul 'cantitate' nu poate fi mai mic sau egal cu 0.");
      return;
    }

    if (id_deviz === "" || isNaN(Number(id_deviz))) {
      alertError(
        "Ruta/Pagina aceasta este invalida. V-am redirectionat inapoi la devize."
      );
      history.push("/devize");
    }

    try {
      setLoading(true);
      const { rezultat } = await transferaProdus(account.token, {
        ...produs,
        Cantitate: Number(produs.Cantitate),
        CodSal: Number(jwtDecode(account.token).payload.id),
        IdDecont: Number(id_deviz),
      });
      const mesaj = `Cod: ${rezultat.codSP} ${rezultat.mesajSP}`;
      if (rezultat.codSP === 0) alertSuccess(mesaj);
      else alertWarning(mesaj);
    } catch (error) {
      console.log(error);
      alertError(`A aparut o eroare la apelarea API-ului ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function LoadProducts() {
    try {
      setLoadingProduse(true);
      const { rezultat } = await incarcaProduse(account.token, Number(id_deviz));
      console.log(rezultat)
      setProduse(rezultat)
    } catch (err) {
      alertError("A aparut o eroare la incarcarea produselor.");
    } finally {
      setLoadingProduse(false);
    }
  }

  async function CopyFromClipboard() {
    try {
      const clipText = await navigator.clipboard.readText();
      console.log(clipText)
      setProdus({ ...produs, CodBara: clipText });
    }
    catch (err) {
        alertError("Nu ati acordat permisiunea pentru citirea din clipboard. " + err);
      }
  }

  function rescanProdus() {
    setScanat(false);
    setProdus(PRODUS_INIT_VALS);
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-5">Scanare produs</h1>
        <p className="lead">Aici poti scana si vizualiza produse</p>
        <hr className="my-4" />

        <button
          data-backdrop="false"
          data-toggle="modal"
          style={{ width: "100%" }}
          data-target="#modalProduse"
          className="btn btn-primary btn-lg shadow mx-0"
          onClick={LoadProducts}
        >
          Produse
        </button>
        <ProductsModal loading={loadingProduse} produse={produse} />

        {scanat === false ? (
          <div className="dropdown">
            <button
              style={{ width: "100%" }}
              className="mx-0 btn btn-secondary btn-lg dropdown-toggle"
              type="button"
              id="dropdownMenuButton-cameras"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Selecteaza camera
            </button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton-cameras"
            >
              {devices.map((dev: any) => (
                <div
                  key={dev.deviceId}
                  className={`dropdown-item ${dev.deviceId === cameraId ? "active" : ""
                    }`}
                  onClick={() => {
                    setCameraId(dev.deviceId);
                    localStorage.setItem("camera", dev.deviceId);
                  }}
                >
                  {dev.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={rescanProdus}
            className="btn btn-secondary btn-lg col-12 m-0 shadow"
          >
            Scaneaza alt produs
          </button>
        )}

        <div className="alert alert-success" role="alert">
          Vizualizarea camerei s-ar putea sa necesite timp, va rugam sa
          asteptati dupa selectarea acesteia.
        </div>
        {cameraId === "" ? (
          <></>
        ) : (
          <BarcodeComponent
            BarCodeOnUpdate={BarCodeOnUpdate}
            cameraId={cameraId}
            scanat={scanat}
          />
        )}
        <button
          disabled={loading}
          onClick={CopyFromClipboard}
          className="btn btn-primary mb-2 col-12 mx-0 shadow"
        >
          Copiaza din clipboard
        </button>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-code1">
              Cod
            </span>
          </div>
          <input
            value={produs.CodBara}
            type="text"
            onChange={handleChangeTextInput}
            name="CodBara"
            className="form-control"
            aria-label="Code"
            aria-describedby="basic-code1"
          />
        </div>

        {produs.CodBara !== "" && (
          <form onSubmit={handleSubmit} className="input-group mb-3 mt-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-number1">
                Cantitate
              </span>
            </div>
            <input
              value={produs.Cantitate}
              onChange={handleChangeTextInput}
              type="text"
              name="Cantitate"
              className="form-control col-12"
              aria-label="Code"
              aria-describedby="basic-number1"
            />
            <div className="col-12 row mt-5 mb-5">
              <div className="custom-control custom-radio col-6">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="consum"
                  name="consum"
                  onChange={handleChangeRadioButton}
                  checked={produs.TransferClient === 1}
                />
                <label className="custom-control-label" htmlFor="consum">
                  Consum
                </label>
              </div>
              <div className="custom-control custom-radio col-6">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="retur_marfa"
                  name="retur_marfa"
                  onChange={handleChangeRadioButton}
                  checked={produs.TransferClient === 0}
                />
                <label className="custom-control-label" htmlFor="retur_marfa">
                  Retur marfa
                </label>
              </div>
            </div>
            <button
              disabled={loading}
              className="btn btn-primary btn-lg col-12 m-0 shadow"
            >
              Confirma
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductScanner;
