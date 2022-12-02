import React from "react";
import { DateFullFormat } from "../../utils/TimeFunctions";
import { EvidentaActivitate } from "../activitati/ActivitatiTypes";

interface IProps {
  activitate: EvidentaActivitate;
}

export default function ActivitateInformatii({ activitate }: IProps) {
  return (
    <>
      <div className="w-100 alert alert-success">
        <b>Client:</b> {activitate.client}
        <br />
        <b>Subiect:</b> {activitate.subiect}
        <br />
      </div>
      <div className="w-100 alert alert-primary">
        <b>Stare:</b> {activitate.stareStr}
        <br />
        <b>Prioritate:</b> {activitate.prioritateStr}
        <br />
        <b>Valabilitate:</b> {DateFullFormat(activitate.dataStart)} <b>-</b>{" "}
        {DateFullFormat(activitate.dataStop)}
        <br />
        <b>Responsabil principal: </b>
        {activitate.responsabilActivitate ? "Da" : "Nu"}
        <br />
      </div>
    </>
  );
}
