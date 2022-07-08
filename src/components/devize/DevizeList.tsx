import React, {useState, useContext, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import DevizeContext, { Deviz } from '../../store/DevizeStore';
import { DateFullFormat } from '../../utils/TimeFunctions';
import  {  withRouter } from 'react-router-dom'

 function DevizeList({ history}:any){
  const {devizeState} : any = useContext(DevizeContext);
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Deviz',
        field: 'deviz',
        width: 90,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Client',
        field: 'client',
        width: 200,
      },
      {
        label: 'Dosar',
        field: 'dosar',
        width: 75,
      },
    ],
    rows: devizeState.devize.map((devizMap: Deviz)=> {
      return {
        deviz: devizMap.numarDeviz,
        dosar: devizMap.numarDosar,
        client: devizMap.client,
        clickEvent: () => history.push("/devize/" + devizMap.idDeviz)
      }
    })
  });

  useEffect(()=>{
    setDatatable({
      ...datatable,
      rows: devizeState.devize.map((devizMap: Deviz)=> {
        return {
          deviz: devizMap.numarDeviz,
          dosar: devizMap.numarDosar,
          data: DateFullFormat(devizMap.dataDeviz),
          client: devizMap.client,
          clickEvent: () => history.push("/devize/" + devizMap.idDeviz)
        }
      })
    })
  }, [devizeState])

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

export default withRouter(DevizeList)
