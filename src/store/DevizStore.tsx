import React, { useState, createContext } from "react";

export interface IDevizTemporaryState {
  Observatii: string;
  Concluzii: string;
  ProcentFinalizare: number;
}

const DevizTemporaryStateContext = createContext({});

export const DevizTemporaryStateProvider = ({ children }: any) => {
  const [devizTemporaryState, setDevizTemporaryState] =
    useState<IDevizTemporaryState>({
      Observatii: "",
      Concluzii: "",
      ProcentFinalizare: 0,
    });

  return (
    <DevizTemporaryStateContext.Provider
      value={{ devizTemporaryState, setDevizTemporaryState }}
    >
      {children}
    </DevizTemporaryStateContext.Provider>
  );
};

export default DevizTemporaryStateContext;
