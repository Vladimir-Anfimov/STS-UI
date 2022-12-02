import React from "react";
import { IInterogareActivitati } from "./ActivitatiTypes";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

interface IProps {
  interogare: IInterogareActivitati;
  onChangeInterogare: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitInterogare: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isLoaded: boolean;
}

export default function ActivitatiInterogare({
  interogare,
  onChangeInterogare,
  onSubmitInterogare,
  isLoaded,
}: IProps) {
  return (
    <form onSubmit={onSubmitInterogare}>
      <div className="form-group">
        <label>De la</label>
        <DatePickerComponent
          onChange={onChangeInterogare}
          id="datepicker"
          value={new Date(interogare.DeLa)}
          format="dd-MM-yyyy"
          placeholder="Enter date"
          name="DeLa"
        />
      </div>
      <div className="form-group">
        <label>Pana la</label>
        <DatePickerComponent
          onChange={onChangeInterogare}
          id="datepicker"
          value={new Date(interogare.PanaLa)}
          format="dd-MM-yyyy"
          placeholder="Enter date"
          name="PanaLa"
        />
      </div>
      <button
        disabled={!isLoaded}
        className="m-0 btn btn-primary btn-lg shadow"
        style={{ width: window.innerWidth <= 768 ? "100%" : "20%" }}
      >
        Cauta perioada {!isLoaded && <>...</>}
      </button>
    </form>
  );
}
