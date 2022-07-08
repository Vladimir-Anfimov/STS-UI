import React, { useState, createContext } from "react";

export interface ISearchParteneri {
  TipCautare: number;
  SirCautare: string;
}

export interface IPartener {
  adresa: string;
  client: string;
  codPart: number;
}

const ParteneriContext = createContext({});

export const ParteneriProvider = ({ children }: any) => {
  const [parteneriState, setParteneriState] = useState<IPartener[]>([]);
  const [search, setSearch] = useState<ISearchParteneri>({
    TipCautare: 2,
    SirCautare: "",
  });

  const changeParteneriState = (
    _parteneri?: IPartener[],
    _search?: ISearchParteneri
  ) => {
    if (_parteneri !== undefined) setParteneriState(_parteneri);
    if (_search !== undefined) setSearch(_search);
  };

  return (
    <ParteneriContext.Provider
      value={{ parteneriState, search, changeParteneriState }}
    >
      {children}
    </ParteneriContext.Provider>
  );
};

export default ParteneriContext;
