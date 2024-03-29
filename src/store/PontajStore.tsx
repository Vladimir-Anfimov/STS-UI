import React, { useState, useEffect, useContext, createContext } from "react";
import { jwtDecode } from "jwt-js-decode";
import AccountContext from "./AccountStore";
import { starePontaj } from "../api/pontajApi";

const PontajContext = createContext({});

export const PontajProvider = ({ children }: any) => {
  const [pontajState, setPontajState] = useState<number | null>(null);
  const { account } = useContext<any>(AccountContext);
  const [loading, setLoading] = useState(true);

  const changePontajState = (_status: number) => setPontajState(_status);

  useEffect(() => {
    if (account.valid === true) {
      starePontaj(account.token, Number(jwtDecode(account.token).payload.id))
        .then((res: { stare: number }) => changePontajState(res.stare))
        .catch((err: any) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [account]);

  return (
    <PontajContext.Provider value={{ pontajState, setPontajState, loading }}>
      {children}
    </PontajContext.Provider>
  );
};

export default PontajContext;
