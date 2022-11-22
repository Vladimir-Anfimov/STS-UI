import React from "react";
import { useHistory } from "react-router-dom";

interface IProps {
  id_deviz: number;
}

export default function ActivitateDevizProdus({ id_deviz }: IProps) {
  const history = useHistory();
  return (
    <>
      <button
        className="btn btn-primary shadow col-lg-3 col-10"
        onClick={() => history.push(`/produs/${id_deviz}`)}
      >
        Scaneaza produs{" "}
      </button>
    </>
  );
}
