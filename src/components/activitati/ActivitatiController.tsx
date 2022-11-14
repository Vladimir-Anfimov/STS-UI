import * as React from "react";
import { extend } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import "./kanban.css";
import * as dataSource from "./datasource.json";

export default class ActivitatiController extends React.Component {
  private data: Object[] = extend(
    [],
    (dataSource as { [key: string]: Object }).kanbanData,
    undefined,
    true
  ) as Object[];
  private columnTemplate(props: { [key: string]: string }): JSX.Element {
    return (
      <div className="header-template-wrap">
        <div className={"header-icon e-icons " + props.keyField}></div>
        <div className="header-text">{props.headerText}</div>
      </div>
    );
  }
  public render(): JSX.Element {
    return (
      <div className="jumbotron mt-4">
        <div className="kanban-control-section">
          <div className="control-section">
            <div className="control-wrapper">
              <KanbanComponent
                cssClass="kanban-header"
                id="kanban"
                keyField="Status"
                dataSource={this.data}
                cardSettings={{
                  contentField: "Summary",
                  headerField: "Id",
                  tagsField: "Tags",
                  grabberField: "Color",
                  footerCssField: "ClassName",
                }}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="To Do"
                    keyField="Open"
                    template={this.columnTemplate.bind(this)}
                  />
                  <ColumnDirective
                    headerText="In Progress"
                    keyField="InProgress"
                    template={this.columnTemplate.bind(this)}
                  />
                  <ColumnDirective
                    headerText="In Review"
                    keyField="Review"
                    template={this.columnTemplate.bind(this)}
                  />
                  <ColumnDirective
                    headerText="Done"
                    keyField="Close"
                    template={this.columnTemplate.bind(this)}
                  />
                </ColumnsDirective>
              </KanbanComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
