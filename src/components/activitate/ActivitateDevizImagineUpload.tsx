import React from "react";
import { EvidentaDeviz } from "../activitati/ActivitatiTypes";
import { FotoIcon } from "../deviz/DevizIcons";
import { AddImage } from "../multiused/AddImage";

interface IProps {
  deviz: EvidentaDeviz;
  locationEnabled: boolean;
}

export default function ActivitateDevizImagineUpload({
  deviz,
  locationEnabled,
}: IProps) {
  return (
    <>
      <button
        disabled={!locationEnabled}
        data-backdrop="false"
        data-toggle="modal"
        data-target="#exampleModal2"
        className="btn BTN-PROGRAM mt-lg-1 mt-4 btn-primary btn-lg shadow"
      >
        <FotoIcon /> Adauga foto
      </button>
      <AddImage IdPunctDeLucru={deviz.idPunctDeLucru} CodPart={deviz.codPart} />
    </>
  );
}
