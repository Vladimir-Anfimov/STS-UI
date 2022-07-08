import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { askIfSure } from "../../utils/AlertTypes";
import AccountContext from "../../store/AccountStore";

function Navbar({ history }: any) {
  const { changeUserSession }: any = useContext(AccountContext);

  function handleLogout() {
    askIfSure("Sigur vrei sa ieși din aplicație?", () => {
      changeUserSession(null);
      localStorage.removeItem("token");
      history.push("/login");
    });
  }
  return (
    <>
      <div className="SIDE-BAR shadow">
        <div onClick={() => history.push(`/`)}>
          <p style={{ fontWeight: 400 }}>ALGOCONT.NET</p>
        </div>
        <hr />
        <ul>
          <li onClick={() => history.push(`/pontaj`)}>
            <img src="https://img.icons8.com/ios/50/000000/window-settings.png" />{" "}
            Pontaj
          </li>
          <li onClick={() => history.push(`/devize`)}>
            <img src="https://img.icons8.com/wired/64/000000/add-list.png" />{" "}
            Ordin servici
          </li>
          <li onClick={() => history.push(`/parteneri`)}>
            <img src="https://img.icons8.com/dotty/80/000000/teamwork.png" />{" "}
            Parteneri
          </li>
          <li onClick={() => history.push(`/setari`)}>
            <img src="https://img.icons8.com/ios/50/000000/settings--v1.png" />{" "}
            Setări
          </li>
          <li onClick={handleLogout}>
            <img src="https://img.icons8.com/ios/50/000000/enter-2.png" />{" "}
            Iesire
          </li>
        </ul>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <a
          style={{ fontWeight: 400 }}
          onClick={() => history.push(`/pontaj`)}
          className="navbar-brand text-white"
        >
          ALGOCONT.NET
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              onClick={() => history.push(`/pontaj`)}
              className="nav-item nav-link active"
            >
              <img
                className="ICON-IMG-PHONE"
                src="https://img.icons8.com/ios/50/000000/window-settings.png"
              />{" "}
              Pontaj
            </a>
            <a
              onClick={() => history.push(`/devize`)}
              className="nav-item nav-link active"
            >
              <img
                className="ICON-IMG-PHONE"
                src="https://img.icons8.com/wired/64/000000/add-list.png"
              />{" "}
              Ordin servici
            </a>
            <a
              onClick={() => history.push(`/parteneri`)}
              className="nav-item nav-link active"
            >
              <img
                className="ICON-IMG-PHONE"
                src="https://img.icons8.com/dotty/80/000000/teamwork.png"
              />{" "}
              Parteneri
            </a>
            <a
              onClick={() => history.push(`/setari`)}
              className="nav-item nav-link active"
            >
              <img
                className="ICON-IMG-PHONE"
                src="https://img.icons8.com/ios/50/000000/settings--v1.png"
              />{" "}
              Setări
            </a>
            <a onClick={handleLogout} className="nav-item nav-link active">
              <img
                className="ICON-IMG-PHONE"
                src="https://img.icons8.com/ios/50/000000/enter-2.png"
              />{" "}
              Iesire
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);
