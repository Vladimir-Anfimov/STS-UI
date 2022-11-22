import React from "react";
import { useHistory } from "react-router-dom";
import { MaintenanceIcon } from "../deviz/DevizIcons";

interface IProps {
  idDeviz: number;
}

export default function ActivitateDevizTehnic({ idDeviz }: IProps) {
  const history = useHistory();
  return (
    <button
      onClick={() => history.push(`/tehnicsts/${idDeviz}`)}
      className="btn BTN-PROGRAM mt-lg-1 mt-4 btn-primary btn-lg shadow"
    >
      <MaintenanceIcon /> Tehnic STS
    </button>
  );
}
