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
import { jwtDecode } from "jwt-js-decode";
import {
  EvidentaActivitate,
  IInterogareActivitati,
  IKanbanActivitate,
} from "./ActivitatiTypes";
import {
  configureColor,
  configureDetails,
  configureStatus,
} from "./ActivitatiFunctions";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  updateActivitati,
  updateIsLoaded,
} from "../../redux/slices/ActivitatiSlice";
import { incarcaActivitati } from "../../api/activitatiApi";
import { alertError } from "../../utils/AlertTypes";

export default function ActivitatiController() {
  const activitatiState = useAppSelector((state) => state.activitati);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { account } = useContext<any>(AccountContext);
  const [interogare, setInterogare] = useState<IInterogareActivitati>({
    CodSal: Number(jwtDecode(account.token).payload.id),
    DeLa: new Date(2022, 0, 1).toJSON(),
    PanaLa: new Date(2022, 12, 31).toJSON(),
  });
  // TODO: De setat perioada pt interogare din UI
  function transformaActivitate(
    activitate: EvidentaActivitate
  ): IKanbanActivitate {
    return {
      Id: activitate.subiect,
      TodoId: activitate.idActivitate,
      Summary: configureDetails(activitate.detalii),
      ClassName: "",
      Color: configureColor(activitate.prioritate),
      Status: configureStatus(activitate.stare),
      Tags: `Prioritate ${activitate.prioritateStr.toLowerCase()},`,
      idDeviz: activitate.idDeviz,
    };
  }

  async function onMount() {
    try {
      const response = await incarcaActivitati(account.token, interogare);
      console.log(response.activitati[0].idActivitateInceputa)
      dispatch(updateActivitati(response.activitati));
    } catch (err) {
      alertError(`A aparut o eroare la incarcarea activitatilor. ${err}`);
    } finally {
      dispatch(updateIsLoaded(true));
    }
  }

  useEffect(() => {
    if (!activitatiState.isLoaded) {
      onMount();
      return;
    }

    console.log(activitatiState.activitati[0], activitatiState.activitati[0].idActivitateInceputa)
    if (
      activitatiState.activitati.length === 1 &&
      activitatiState.activitati[0].idActivitateInceputa !== 0
    )
      history.push(`/activitati/${activitatiState.activitati[0].idActivitate}`);
  }, [activitatiState]);

  const handleClick = (args: CardClickEventArgs) => {
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

  if (activitatiState.isLoaded === false)
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
              dataSource={activitatiState.activitati.map((x) =>
                transformaActivitate(x)
              )}
              cardSettings={{
                contentField: "Summary",
                headerField: "Id",
                tagsField: "Tags",
                grabberField: "Color",
                footerCssField: "ClassName",
              }}
              allowDragAndDrop={false}
              cardClick={handleClick}
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
