import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import { IProdus } from "./ProductScanner";

interface IProps {
  produse: IProdus[];
  loading: boolean;
}

export const ProductsModal = ({ produse, loading }: IProps) => {
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'CodProdus',
        field: 'CodProdus',
        width: 75
      },
      {
        label: 'Produs',
        field: 'Produs',
        width: 125,
      },
      {
        label: 'Utilizat',
        field: 'Utilizat',
        width: 75,
      },
      {
        label: 'Masura',
        field: 'UnitMasura',
        width: 90,
      }
    ],
    rows: produse.map((prod: IProdus) => {
      return {
        CodProdus: prod.codProdus,
        Produs: prod.produs,
        Utilizat: prod.utilizat,
        UnitMasura: prod.unitMas
      }
    })
  });

  useEffect(() => {
    setDatatable({
      ...datatable, rows: produse.map((prod: IProdus) => {
        return {
          CodProdus: prod.codProdus,
          Produs: prod.produs,
          Utilizat: prod.utilizat,
          UnitMasura: prod.unitMas
        }
      })
    })
  }, [produse])

  return (
    <div
      className="modal fade"
      id="modalProduse"
      // @ts-ignore
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              <b>Produse</b>
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {loading ? (
              <Spinner />
            ) : (
              <div className="container-fluid">
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                  pagingTop
                  searchTop
                  searchBottom={false}
                  barReverse
                  scrollX
                  striped
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
