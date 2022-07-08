import React, {useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { withRouter } from 'react-router-dom'
import { IPartener } from '../../store/ParteneriStore';

 function ParteneriList({parteneri, history}:any){
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Client',
        field: 'client',
        width: 100,
      },
      {
        label: 'Adresa',
        field: 'adresa',
        sort: 'asc',
        width: 150,
      },
    ],
    rows: []
  });

  useEffect(()=>{
    if(parteneri !== null) setDatatable({
      ...datatable,
      rows: parteneri.map((partener:IPartener)=>{
        return {
          ...partener,
          clickEvent: () => history.push(`/parteneri/${partener.codPart}`)
        }
      })})
  }, [parteneri])

  return (
      <div className="container-fluid ml-1 ml-sm-0 mr-1 mt-4 mr-sm-0 ">
        <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={datatable}
            pagingTop
            searchTop={false}
            searchBottom={false}
            barReverse
            scrollX
            striped
        />
    </div>
  );
}

export default withRouter(ParteneriList)
