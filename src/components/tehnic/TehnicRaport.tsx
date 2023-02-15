import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import TehnicChestionar, { Chestionar } from "./TehnicChestionar";
import TehnicConstatari, { Constatare } from "./TehnicConstatari";

type Tab = "chestionar" | "constatari";

function TehnicRaport({ match, history }: any) {
  const [tab, setTab] = useState<Tab>("chestionar");
  const id_deviz = Number(match.params.id_deviz);

  // chestionar data
  const [chestionar, setChestionar] = useState<Chestionar[]>([]);
  const [loadingChestionar, setLoadingChestionar] = useState<boolean>(true);

  // constatari data
  const [constatari, setConstatari] = useState<Constatare>({
    constatari: "",
    echipamenteMateriale: "",
    problemeNerezolvate: "",
    propuneri: "",
  });
  const [loadingConstatari, setLoadingConstatari] = useState<boolean>(true);

  function ClassNameTab(_tab: string) {
    let _class: string = "p-2 font-weight-bold btn-lg btn";
    if (tab === _tab) _class += " text-success";
    return _class;
  }

  return (
    <>
      <div className="FIXED-BREADCRUMB d-flex justify-content-center pt-2 pb-2 bg-white shadow">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setTab("chestionar")}
          className={ClassNameTab("chestionar")}
        >
          <span>Chestionar</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setTab("constatari")}
          className={ClassNameTab("constatari")}
        >
          Constatari
        </div>
      </div>

      {tab === "chestionar" ? (
        <TehnicChestionar
          chestionar={chestionar}
          setChestionar={setChestionar}
          id_deviz={id_deviz}
          loadingChestionar={loadingChestionar}
          setLoadingChestionar={setLoadingChestionar}
        />
      ) : (
        <TehnicConstatari
          constatari={constatari}
          setConstatari={setConstatari}
          id_deviz={id_deviz}
          loadingConstatari={loadingConstatari}
          setLoadingConstatari={setLoadingConstatari}
        />
      )}
    </>
  );
}

export default withRouter(TehnicRaport);
