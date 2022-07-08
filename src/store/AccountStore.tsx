import React, { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-js-decode";
import { verifyToken } from "../api/securityApi";

const roleProp: string =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export interface AccountState {
  token: string | null;
  roles: string[] | null;
  valid: true | false | null;
  CodSal: number | null;
}

const AccountContext = createContext({});

export const AccountProvider = ({ children, history }: any) => {
  const [account, setStateAccount] = useState<AccountState>({
    token: localStorage.getItem("token"),
    roles: null,
    valid: null,
    CodSal: null,
  });

  const changeUserSession = (_token: string | null) => {
    if (_token === null)
      setStateAccount({
        token: null,
        roles: null,
        valid: null,
        CodSal: null,
      });
    else
      setStateAccount({
        token: _token,
        roles:
          jwtDecode(localStorage.getItem("token") || "").payload[roleProp] ||
          null,
        valid: true,
        CodSal:
          Number(
            jwtDecode(localStorage.getItem("token") || "").payload["id"]
          ) || null,
      });
  };

  useEffect(() => {
    if (account.valid === null) {
      // @ts-ignore
      verifyToken(account.token)
        .then((status: any) => {
          // console.log(status)
          if (status === 401) throw new Error();
          else
            setStateAccount({
              ...account,
              roles:
                jwtDecode(localStorage.getItem("token") || "").payload[
                  roleProp
                ] || null,
              valid: true,
              CodSal:
                Number(
                  jwtDecode(localStorage.getItem("token") || "").payload["id"]
                ) || null,
            });
        })
        .catch((err: any) => {
          console.log(err);
          setStateAccount({
            ...account,
            token: null,
            valid: false,
            roles: null,
          });
        });
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, changeUserSession }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
