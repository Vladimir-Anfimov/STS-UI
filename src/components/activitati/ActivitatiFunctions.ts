import { IColorKanban, IStatusKanban } from "./ActivitatiTypes";

export const configureColor = (prioritate: number): IColorKanban => {
  if (prioritate === 1) return "blue";
  if (prioritate === 2) return "orange";
  return "red";
};

export const configureStatus = (stare: number): IStatusKanban => {
  if (stare === 1) return "Open";
  if (stare === 2) return "InProgress";
  return "Close";
};

export const configureDetails = (detalii: string) => {
  const MAX_LENGTH = 200;
  if (detalii.length > MAX_LENGTH) return detalii.slice(0, MAX_LENGTH) + "...";
  return detalii;
};
