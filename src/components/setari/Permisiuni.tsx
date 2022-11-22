import { jwtDecode } from "jwt-js-decode";
import React, { useContext, useEffect, useState } from "react";
import AccountContext from "../../store/AccountStore";
import { alertError } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";

const Permisiuni = () => {
  const { account } = useContext<any>(AccountContext);
  const [roluri, setRoluri] = useState<string[]>([]);
  const [permisiuni, setPermisiuni] = useState({
    camera: "",
    geolocatie: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryPermissions();
    getUtilizatorRoluri();
  }, []);

  const queryPermissions = async () => {
    try {
      //@ts-ignore
      const camera = await navigator.permissions.query({ name: "camera" });
      const geolocatie = await navigator.permissions.query({
        name: "geolocation",
      });

      setPermisiuni({ camera: camera.state, geolocatie: geolocatie.state });
    } catch (err) {
      alertError("Eroare la citirea permisiunilor");
    } finally {
      setLoading(false);
    }
  };

  const getUtilizatorRoluri = () => {
    const _roluri = jwtDecode(account.token).payload[
      process.env.REACT_APP_USER_TOKEN_ROLES!
    ];
    setRoluri(_roluri);
  };

  const ReformatTextPermission = (text: string) => {
    if (text == "granted")
      return <span style={{ display: "inline" }}>acordata</span>;
    if (text == "prompt")
      return <span style={{ display: "inline" }}>va fi ceruta la nevoia</span>;
    return (
      <span style={{ display: "inline" }}>
        <span style={{ display: "inline", color: "red" }}>refuzata</span> (poate
        fi modificata doar din setarile browserului)
      </span>
    );
  };

  return (
    <div className="jumbotron mt-4">
      <h1 className="display-5">Permisiuni</h1>
      <p className="lead">Permisiuni acordate aplicatiei</p>
      <hr className="my-4" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p>
            <b>Camera:</b> {ReformatTextPermission(permisiuni.camera)}
          </p>
          <p>
            <b>Geolocatie:</b> {ReformatTextPermission(permisiuni.geolocatie)}
          </p>
        </>
      )}
      <b>Roluri: </b>
      {roluri.length === 0 ? (
        <Spinner />
      ) : (
        roluri.map((rol, index) => (
          <span key={rol}>
            {rol}
            {index < roluri.length - 1 && <>,</>}{" "}
          </span>
        ))
      )}
      <hr className="my-4" />
      <div className="alert alert-success" role="alert">
        In cazul in care actualizati permisiunile din setarile browser-ului
        trebuie sa dati refresh la pagina pentru a avea efect.
      </div>
    </div>
  );
};

export default Permisiuni;
