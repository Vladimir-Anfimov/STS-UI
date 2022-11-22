import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EvidentaActivitate,
} from "../../components/activitati/ActivitatiTypes";

export interface IActivitatiState {
  activitati: EvidentaActivitate[];
  isLoaded: boolean;
}

const initialState: IActivitatiState = {
  activitati: [],
  isLoaded: false,
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
  },
});

export const { updateActivitati, updateIsLoaded } = activitatiSlice.actions;
export default activitatiSlice.reducer;
