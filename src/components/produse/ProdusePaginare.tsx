import React from "react";

export type IDirectiePaginare = 1 | -1;

interface IProps {
  pagina: number;
  updatePagina: (directie: IDirectiePaginare) => void;
}

export default function ProdusePaginare({ pagina, updatePagina }: IProps) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center mt-3">
        <li className="page-item">
          <div
            onClick={() => updatePagina(-1)}
            className="page-link btn white-text btn-sm btn-secondary"
          >
            Inapoi
          </div>
        </li>
        <li className="page-item">
          <div className="page-link btn white-text btn-sm btn-secondary">
            {pagina}
          </div>
        </li>
        <li className="page-item">
          <div
            onClick={() => updatePagina(1)}
            className="page-link btn white-text btn-sm btn-secondary"
          >
            Urmatoarea
          </div>
        </li>
      </ul>
    </nav>
  );
}
