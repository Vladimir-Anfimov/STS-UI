import React, { useState, useEffect, useContext } from "react";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
  CardClickEventArgs,
} from "@syncfusion/ej2-react-kanban";
import "./kanban.css";
import * as dataSource from "./datasource.json";
import Spinner from "../layout/Spinner";
import AccountContext from "../../store/AccountStore";
import { incarcaActivitati } from "../../api/activitatiApi";
import { alertError } from "../../utils/AlertTypes";
import { jwtDecode } from "jwt-js-decode";
import { EvidentaActivitati } from "./ActivitatiTypes";

export interface IInterogareActivitati {
  CodSal: number;
  DeLa: Date;
  PanaLa: Date;
}

export default function ActivitatiController() {
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(true);
  const [interogare, setInterogare] = useState<IInterogareActivitati>({
    CodSal: Number(jwtDecode(account.token).payload.id),
    DeLa: new Date(2022, 0, 1),
    PanaLa: new Date(2022, 12, 31),
  });

  const [data, setData] = useState<Object[]>(
    extend(
      [],
      (dataSource as { [key: string]: Object }).kanbanData,
      undefined,
      true
    ) as Object[]
  );

  function transformaActivitati(activitatiDb: EvidentaActivitati[]) {
    console.log(activitatiDb);
  }

  useEffect(() => {
    incarcaActivitati(account.token, interogare)
      .then((res) => transformaActivitati(res.activitati))
      .catch((err) =>
        alertError(`A aparut o eroare la incarcarea activitatilor. ${err}`)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleDoubleClick = (args: CardClickEventArgs) => {
    console.log("click", args);
  };

  const columnTemplate = (props: { [key: string]: string }): JSX.Element => {
    return (
      <div className="header-template-wrap" style={{ cursor: "pointer" }}>
        <div className={"header-icon e-icons " + props.keyField}></div>
        <div className="header-text">{props.headerText}</div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
        <br />
        <h4>Se incarca..</h4>
      </div>
    );

  return (
    <div className="jumbotron mt-4">
      <div className="kanban-control-section">
        <div className="control-section">
          <div className="control-wrapper">
            <KanbanComponent
              cssClass="kanban-header"
              id="kanban"
              keyField="Status"
              dataSource={data}
              cardSettings={{
                contentField: "Summary",
                headerField: "Id",
                tagsField: "Tags",
                grabberField: "Color",
                footerCssField: "ClassName",
              }}
              allowDragAndDrop={false}
              cardDoubleClick={handleDoubleClick}
              dialogOpen={(args) => (args.cancel = true)}
            >
              <ColumnsDirective>
                <ColumnDirective
                  headerText="Neincepute"
                  keyField="Open"
                  template={columnTemplate}
                />
                <ColumnDirective
                  headerText="In desfasurare"
                  keyField="InProgress"
                  template={columnTemplate}
                />
                <ColumnDirective
                  headerText="Incheiate"
                  keyField="Close"
                  template={columnTemplate}
                />
              </ColumnsDirective>
            </KanbanComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
