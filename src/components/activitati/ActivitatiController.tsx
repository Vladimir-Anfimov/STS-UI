import React, { useEffect, useState } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import * as dataSource from "./data.json";
import { extend } from "@syncfusion/ej2-base";

export default function ActivitatiController() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    //@ts-ignore
    setData(extend([], dataSource.kanbanData, null, true));

    //@ts-ignore
    console.log(extend([], dataSource.kanbanData, null, true));
  }, []);

  return (
    <div className="jumbotron mt-4">
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={data}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
        //   dataBound={this.OnDataBound.bind(this)}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="Open" />
          <ColumnDirective headerText="In Progress" keyField="InProgress" />
          <ColumnDirective headerText="Testing" keyField="Testing" />
          <ColumnDirective headerText="Done" keyField="Close" />
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
}
