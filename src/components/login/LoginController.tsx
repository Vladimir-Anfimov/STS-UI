//@ts-nocheck

import React, { useContext, useState, useEffect } from "react";
import { loginUtilizator } from "../../api/securityApi";
import { withRouter, useHistory } from "react-router-dom";
import AccountContext from "../../store/AccountStore";
import { MDBContainer, MDBBtn, MDBInput } from "mdbreact";
import LoginIcon from "../../images/login.png";

export interface Account {
  Utilizator: string;
  ParolaWeb: string;
}

const LoginController = () => {
  const { account, changeUserSession }: any = useContext(AccountContext);
  const [credentials, setCredentials] = useState<Account>({
    Utilizator: "",
    ParolaWeb: "",
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (account.valid === true) history.push("/");
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    loginUtilizator(credentials)
      .then((res) => {
        localStorage.setItem("token", res.token);
        changeUserSession(res.token);
        setError(false);
        history.push("/pontaj");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="mt-4">
      <MDBContainer>
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "white", padding: 20, width: "100%" }}
          className="shadow rounded"
        >
          <img
            src={LoginIcon}
            style={{ maxWidth: 150 }}
            className="d-block mx-auto bg-login-image mb-5 pt-4"
          ></img>
          <div className="grey-text">
            <MDBInput
              value={credentials.Utilizator}
              label="Utilizator"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              onInput={(e) =>
                setCredentials({ ...credentials, Utilizator: e.target.value })
              }
            />
            <MDBInput
              value={credentials.ParolaWeb}
              label="Parola"
              icon="lock"
              group
              type="password"
              validate
              error="wrong"
              success="right"
              onInput={(e) =>
                setCredentials({ ...credentials, ParolaWeb: e.target.value })
              }
            />
          </div>
          <div className="text-center py-4 mt-3">
            <MDBBtn disabled={loading} color="cyan" type="submit">
              Logare
            </MDBBtn>
          </div>

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              Date de logare <a className="alert-link">invalide</a>.
            </div>
          )}
        </form>
      </MDBContainer>
    </div>
  );
};

export default withRouter(LoginController);
