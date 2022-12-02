import {
  CardClickEventArgs,
  ColumnDirective,
  ColumnsDirective,
  Kanban,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  configureColor,
  configureDetails,
  configureStatus,
} from "./ActivitatiFunctions";
import { EvidentaActivitate, IKanbanActivitate } from "./ActivitatiTypes";
import { Query } from "@syncfusion/ej2-data";

export default function ActivitatiKanban() {
  const activitatiState = useAppSelector((state) => state.activitati);
  const [search, setSearch] = useState<string>("");
  const [kanban, setKanban] = useState(new Kanban());

  const history = useHistory();
  const handleClick = (args: CardClickEventArgs) => {
    history.push(`/activitati/${args.data.TodoId}`);
  };

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    let searchValue: string = e.target.value;
    let searchQuery = new Query();
    if (searchValue !== "") {
      searchQuery = new Query().search(
        searchValue,
        ["Tags", "Summary"],
        "contains",
        true
      );
    }
    let _kanban = kanban;
    _kanban.query = searchQuery;
    setKanban(_kanban);
  }

  function transformaActivitate(
    activitate: EvidentaActivitate
  ): IKanbanActivitate {
    const {
      subiect,
      idActivitate,
      detalii,
      prioritate,
      stare,
      prioritateStr,
      idDeviz,
      client,
    } = activitate;
    return {
      Id: subiect,
      TodoId: idActivitate,
      Summary: configureDetails(detalii),
      ClassName: "",
      Color: configureColor(prioritate),
      Status: configureStatus(stare),
      Tags:
        `Prioritate ${prioritateStr.toLowerCase()}, Client ${client},` +
        (idDeviz !== 0 ? `Nr. deviz ${activitate.dateDeviz?.numarDeviz}` : ""),
      idDeviz,
    };
  }
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

  return (
    <div className="kanban-control-section">
      <div className="control-section">
        <div className="control-wrapper">
          <div className="form-group mt-5">
            <label>Cautare dupa nume, deviz, etc</label>
            <input
              type="text"
              onChange={onChangeSearch}
              value={search}
              className="form-control"
              placeholder="Cautare"
            />
          </div>

          <KanbanComponent
            ref={(_kanban) => {
              if (_kanban) setKanban(_kanban);
            }}
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
                headerText="In desfasurare"
                keyField="InProgress"
                template={columnTemplate}
              />
              <ColumnDirective
                headerText="Neincepute"
                keyField="Open"
                template={columnTemplate}
              />
              <ColumnDirective
                headerText="Incheiate"
                keyField="Close"
                template={columnTemplate}
              />
            </ColumnsDirective>
          </KanbanComponent>
          {activitatiState.activitati.length === 0 && activitatiState.isLoaded && (
            <div className="text-center mt-4">
              <h3>Nu există activități în perioada căutată.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
