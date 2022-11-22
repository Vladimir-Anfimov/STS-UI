import { configureStore } from "@reduxjs/toolkit";
import activitatiReducer from "./slices/ActivitatiSlice";

export const store = configureStore({
  reducer: {
    activitati: activitatiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
