import React from "react";
import { EvidentaDeviz } from "../activitati/ActivitatiTypes";
import { ClientIcon } from "../deviz/DevizIcons";

interface IProps {
  deviz: EvidentaDeviz;
}

export default function ActivitateDevizDateInitiale({ deviz }: IProps) {
  return (
    <>
      <div className="col col-12 d-flex">
        <ClientIcon />
        <div className="d-flex flex-column justify-content-center align-items-start">
          <span>
            <b>Nr. deviz:</b> {deviz.numarDeviz}
          </span>
          <span>
            <b>Nr. dosar:</b> {deviz.numarDosar}
          </span>
        </div>
      </div>
      <div className="col col-12 mt-2 ACTIVITATI-DATA">
        <span>{deviz.denumirePunctDeLucru}</span>
        <span>
          <b>Latitudine:</b> {deviz.latitudinePunctDeLucru.toFixed(2)} <br />
          <b>Longitudine:</b> {deviz.longitudinePunctDeLucru.toFixed(2)}
        </span>
      </div>
      <hr />
    </>
  );
}
