import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EvidentaActivitate,
  IInterogareActivitati,
} from "../../components/activitati/ActivitatiTypes";

const WEEKS_IN_MILLISECONDS = 60 * 1000 * 60 * 24 * 7;

export interface IActivitatiState {
  activitati: EvidentaActivitate[];
  isLoaded: boolean;
  interogare: IInterogareActivitati;
}

const initialState: IActivitatiState = {
  activitati: [],
  isLoaded: false,
  interogare: {
    CodSal: 0,
    DeLa: new Date().toJSON(),
    PanaLa: new Date(new Date().getTime() + WEEKS_IN_MILLISECONDS).toJSON(),
  },
};

export const activitatiSlice = createSlice({
  name: "activitati",
  initialState,
  reducers: {
    updateActivitati: (
      state,
      { payload }: PayloadAction<EvidentaActivitate[]>
    ) => {
      state.activitati = payload;
      state.isLoaded = true;
    },
    updateIsLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoaded = payload;
    },
    updateInterogare: (
      state,
      { payload }: PayloadAction<IInterogareActivitati>
    ) => {
      state.interogare = payload;
    },
  },
});

export const { updateActivitati, updateIsLoaded, updateInterogare } =
  activitatiSlice.actions;
export default activitatiSlice.reducer;
