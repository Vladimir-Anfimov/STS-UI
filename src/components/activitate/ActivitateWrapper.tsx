import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ActivitateWrapper({ children }: IProps) {
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <div
          className="row"
          style={
            window.innerWidth <= 768
              ? { display: "flex", justifyContent: "center" }
              : {}
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
