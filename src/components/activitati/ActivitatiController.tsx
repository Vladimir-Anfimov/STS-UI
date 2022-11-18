import React, { useState, useEffect, useContext } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
  CardClickEventArgs,
} from "@syncfusion/ej2-react-kanban";
import "./kanban.css";
import Spinner from "../layout/Spinner";
import AccountContext from "../../store/AccountStore";
import { incarcaActivitati } from "../../api/activitatiApi";
import { alertError } from "../../utils/AlertTypes";
import { jwtDecode } from "jwt-js-decode";
import { EvidentaActivitate, IKanbanActivitate } from "./ActivitatiTypes";
import {
  configureColor,
  configureDetails,
  configureStatus,
} from "./ActivitatiFunctions";
import { useHistory } from "react-router-dom";

export interface IInterogareActivitati {
  CodSal: number;
  DeLa: Date;
  PanaLa: Date;
}

export default function ActivitatiController() {
  const history = useHistory();
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(true);
  const [interogare, setInterogare] = useState<IInterogareActivitati>({
    CodSal: Number(jwtDecode(account.token).payload.id),
    DeLa: new Date(2022, 0, 1),
    PanaLa: new Date(2022, 12, 31),
  });
  const [activitati, setActivitati] = useState<IKanbanActivitate[]>([]);

  function transformaActivitati(activitatiDb: EvidentaActivitate[]) {
    console.log(activitatiDb);
    const _activitati = activitatiDb.map((x) => ({
      Id: x.subiect,
      TodoId: x.idActivitate,
      Summary: configureDetails(x.detalii),
      ClassName: "",
      Color: configureColor(x.prioritate),
      Status: configureStatus(x.stare),
      Tags: `Prioritate ${x.prioritateStr.toLowerCase()},`,
    })) as IKanbanActivitate[];
    setActivitati(_activitati);
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
    history.push(`/activitati/${args.data.TodoId}`);
  };

  const columnTemplate = (props: { [key: string]: string }): JSX.Element => {
    return (
      <div
        className="header-template-wrap"
        style={{ cursor: "pointer", fontSize: 20 }}
      >
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
              dataSource={activitati}
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
