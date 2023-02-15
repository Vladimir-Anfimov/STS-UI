import React from "react";
import { useHistory } from "react-router-dom";

export function NewsView() {
  const history = useHistory();

  return (
    <div>
      <h1 className="display-5">Noutăți </h1>
      <p style={{ fontWeight: "bolder", fontStyle: "italic" }}>
        15 februarie 2023
      </p>
      <p className="lead">
        A fost adăugat un formular de feedback & sugestii pentru aplicația
        Algocont.NET. Vă rugăm ca oricând aveți idei de îmbunătățiri, să le
        comunicați prin intermediul acestuia. Accesați formularul de feedback
        din meniu sau de{" "}
        <span
          onClick={() => history.push("/feedback")}
          style={{
            fontWeight: "bolder",
            textDecoration: "underline",
            fontStyle: "italic",
            cursor: "pointer",
          }}
        >
          aici
        </span>
        .
      </p>

      <hr className="my-4" />
    </div>
  );
}
