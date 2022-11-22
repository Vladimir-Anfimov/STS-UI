import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { alertError, alertWarning } from "../../utils/AlertTypes";
import Spinner from "../layout/Spinner";
import { IInputActivitate, IParamsActivitate } from "./ActivitateTypes";
import ActivitateWrapper from "./ActivitateWrapper";
import ActivitateDevizDateInitiale from "./ActivitateDevizDateInitiale";
import ActivitateDevizPersoaneLegatura from "./ActivitateDevizPersoaneLegatura";
import ActivitateDevizProdus from "./ActivitateDevizProdus";
import ActivitateDevizTraseu from "./ActivitateDevizTraseu";
import ActivitateIncepere from "./ActivitateIncepere";
import {
  ActivitateDetalii,
  Activitate_Observatii_Concluzii_ProcentFinalizare,
} from "./ActivitateInputs";
import ActivitateIncheiere from "./ActivitateIncheiere";
import ActivitateDevizTehnic from "./ActivitateDevizSTS";
import showGelocationError from "../../utils/GeolocationErrors";
import ActivitateDevizImagineUpload from "./ActivitateDevizImagineUpload";

export default function ActivitateController() {
  const history = useHistory();
  const { id_activitate } = useParams<IParamsActivitate>();
  const { activitati, isLoaded } = useAppSelector((state) => state.activitati);
  const [activitateIndex, setActivitateIndex] = useState<number>(-2);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [activitateInput, setActivitateInput] = useState<IInputActivitate>({
    Concluzii: "",
    Observatii: "",
    ProcentFinalizare: 0,
  });

  useEffect(() => {
    if (activitati.length === 1) setActivitateIndex(0);
  }, [activitati]);

  useEffect(() => {
    if (!isLoaded) {
      history.push("/activitati");
      return;
    }
    const _activitateIndex = activitati.findIndex(
      (x) => x.idActivitate === Number(id_activitate)
    );
    if (_activitateIndex === -1) {
      alertWarning(`Nu exista activitate cu id-ul ${id_activitate}`);
      history.push("/activitati");
      return;
    }
    setActivitateInput({
      ...activitateInput,
      ProcentFinalizare: activitati[_activitateIndex].procentFinalizare,
    });
    setActivitateIndex(_activitateIndex);
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        showGelocationError
      );
    else alertError("A aparut o eroare de la geolocatie.");
  }, []);

  if (activitateIndex < 0 || activitateIndex >= activitati.length)
    return (
      <ActivitateWrapper>
        <Spinner />
      </ActivitateWrapper>
    );
  return (
    <ActivitateWrapper>
      {activitati[activitateIndex]?.dateDeviz !== null && (
        <>
          <ActivitateDevizDateInitiale
            deviz={activitati[activitateIndex].dateDeviz!}
          />
          {activitati[activitateIndex].idActivitateInceputa !== 0 && (
            <>
              <ActivitateDevizPersoaneLegatura
                deviz={activitati[activitateIndex].dateDeviz!}
              />
              <ActivitateDevizProdus
                id_deviz={activitati[activitateIndex].idDeviz}
              />
              <ActivitateDevizTraseu
                deviz={activitati[activitateIndex].dateDeviz!}
                locationEnabled={locationEnabled}
              />
              <ActivitateDevizTehnic
                idDeviz={activitati[activitateIndex].idDeviz}
              />
              <ActivitateDevizImagineUpload
                deviz={activitati[activitateIndex].dateDeviz!}
                locationEnabled={locationEnabled}
              />
            </>
          )}
        </>
      )}
      <div
        className="col-12 ACTIVITATI-DATA"
        style={window.innerWidth <= 768 ? { textAlign: "center" } : {}}
      >
        {activitati[activitateIndex].idActivitateInceputa === 0 && (
          <ActivitateIncepere activitate={activitati[activitateIndex]} />
        )}
        <ActivitateDetalii detalii={activitati[activitateIndex].detalii} />
        {activitati[activitateIndex].idActivitateInceputa !== 0 && (
          <Activitate_Observatii_Concluzii_ProcentFinalizare
            isResponsabil={
              activitati[activitateIndex].responsabilActivitate != 0
            }
            activitateInput={activitateInput}
            setActivitateInput={setActivitateInput}
            isDeviz={activitati[activitateIndex].dateDeviz !== null}
          />
        )}
      </div>
      <div>
        {activitati[activitateIndex].idActivitateInceputa !== 0 && (
          <ActivitateIncheiere
            activitate={activitati[activitateIndex]}
            activitateInput={activitateInput}
          />
        )}
      </div>
    </ActivitateWrapper>
  );
}
