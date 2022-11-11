import React, { useEffect, useState } from "react";
import { alertError } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";

const Permisiuni = () => {
  const [permisiuni, setPermisiuni] = useState({
    camera: "",
    geolocatie: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryPermissions();
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
      <hr className="my-4" />
      <div className="alert alert-success" role="alert">
        In cazul in care actualizati permisiunile din setarile browser-ului
        trebuie sa dati refresh la pagina pentru a avea efect.
      </div>
    </div>
  );
};

export default Permisiuni;
