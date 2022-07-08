import React from "react";
import Permisiuni from "./Permisiuni";
import versiuneaActuala from "./Versions";

function Setari() {
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="display-5">Setări</h1>
        <p className="lead">Setările aplicației tale</p>
        <hr className="my-4" />
        <p>
          Versiunea actuala: <b>{versiuneaActuala.versiunea}</b>
        </p>
        <p>
          Data publicarii: <b>{versiuneaActuala.data}</b>
        </p>
        <hr className="my-4" />
      </div>
      <Permisiuni />
    </div>
  );
}

export default Setari;
