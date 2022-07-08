import React, { useState, createContext } from "react";

export interface Deviz {
  pozitia: number;
  idDeviz: number;
  numarDeviz: number;
  dataDeviz: string;
  codPart: number;
  client: string;
  numeDeviz: string;
  detaliiDeviz: string;
  idPunctDeLucru: number;
  denumirePunctDeLucru: string;
  adresa: string;
  numarDosar: number;
  latitudinePunctDeLucru: number;
  longitudinePunctDeLucru: number;
  idActivitateInceputa: number;
  procentFinalizare: number;
  responsabilActivitate: number;
}

const DevizeContext = createContext({});

export const DevizeProvider = ({ children }: any) => {
  const [devizeState, setDevizeState] = useState<{
    devize: Deviz[];
    loadedDevize: boolean;
  }>({
    devize: [],
    loadedDevize: false,
  });

  const changeDevizejState = (_devize: Deviz[], loaded?: boolean) =>
    setDevizeState({
      loadedDevize: loaded !== undefined ? loaded : true,
      devize: _devize,
    });

  return (
    <DevizeContext.Provider value={{ devizeState, changeDevizejState }}>
      {children}
    </DevizeContext.Provider>
  );
};

export default DevizeContext;
