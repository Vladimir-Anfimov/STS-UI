import React from "react";
import { IProdus } from "./ProduseController";

interface IProps {
  produse: IProdus[];
  onClick: (produs: IProdus) => void;
  loading: boolean;
}

export default function ProduseList({ produse, onClick, loading }: IProps) {
  return (
    <ul className="list-group OPACITY">
      {produse.map((produs) => {
        return (
          <li
            style={{ cursor: "pointer" }}
            key={produs.codProdus}
            className="list-group-item shadow mt-1"
            onClick={() => onClick(produs)}
          >
            <b>Denumire: </b>
            {produs.denumireProdus}
            <br />
            <b>Cantitate disponibila: </b>
            {produs.cantitateDisponibila}
            <br />
            <b>Zona depozitare: </b>
            {produs.zonaDepozitare}
            <br />
            <b>Numar curent: </b>
            {produs.numarCurent}
            <br />
            <b>Unitati masura: </b>
            {produs.unitMas}
            <br />{" "}
          </li>
        );
      })}
    </ul>
  );
}
