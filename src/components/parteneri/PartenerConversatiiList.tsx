import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { DateFullFormat } from "../../utils/TimeFunctions";
import { IConversatieParteneri } from "./Partner";

function PartenerConversatiiList({ conversatii }: { conversatii: any }) {
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "Persoana",
        field: "persoana",
        width: 75,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Detalii",
        field: "detalii",
        width: 200,
      },
      {
        label: "Data",
        field: "data",
        width: 75,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: conversatii.map((conversatie: IConversatieParteneri) => {
        return {
          persoana: conversatie.persoanaDeLegatura,
          detalii: conversatie.detalii,
          data: DateFullFormat(conversatie.dataContact),
        };
      }),
    });
  }, [conversatii]);

  return (
    <div className="container-fluid ml-1 ml-sm-0 mr-1 mt-4 mr-sm-0 ">
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
  );
}

export default PartenerConversatiiList;
