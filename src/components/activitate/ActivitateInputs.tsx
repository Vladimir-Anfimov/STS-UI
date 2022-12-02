import React from "react";
import { IInputActivitate } from "./ActivitateTypes";

export const ActivitateDetalii = ({ detalii }: { detalii: string }) => (
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea3">Detalii</label>
    <textarea
      readOnly
      value={detalii}
      className="form-control"
      id="exampleFormControlTextarea3"
      rows={5}
    ></textarea>
  </div>
);

export const Activitate_Observatii_Concluzii_ProcentFinalizare = ({
  activitateInput,
  setActivitateInput,
  isDeviz,
  isResponsabil,
}: {
  activitateInput: IInputActivitate;
  setActivitateInput: (input: IInputActivitate) => void;
  isDeviz: boolean;
  isResponsabil: boolean;
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">
          Activitatea prestata
        </label>
        <textarea
          autoComplete="off"
          value={activitateInput.Observatii}
          onChange={(e) =>
            setActivitateInput({
              ...activitateInput,
              Observatii: e.target.value,
            })
          }
          name="Observatii"
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>
      </div>
      {isResponsabil && (
        <div className="form-group">
          {isDeviz && (
            <>
              <label htmlFor="exampleFormControlTextarea2">Concluzie</label>
              <textarea
                autoComplete="off"
                value={activitateInput.Concluzii}
                onChange={(e) =>
                  setActivitateInput({
                    ...activitateInput,
                    Concluzii: e.target.value,
                  })
                }
                name="Concluzii"
                className="form-control"
                id="exampleFormControlTextarea2"
                rows={3}
              ></textarea>
            </>
          )}
          <div className="form-group">
            <label>Procent finalizare</label>
            <select
              value={activitateInput.ProcentFinalizare}
              onChange={(e) =>
                setActivitateInput({
                  ...activitateInput,
                  ProcentFinalizare: +e.target.value,
                })
              }
              name="ProcentFinalizare"
              className="form-control"
            >
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((procent) => (
                <option key={procent} value={procent}>
                  {procent}%
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};
