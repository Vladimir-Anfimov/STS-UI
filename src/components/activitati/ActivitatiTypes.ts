export interface EvidentaActivitate {
  stare: number;
  stareStr: string;
  prioritate: number;
  prioritateStr: string;
  idActivitate: number;
  subiect: string;
  detalii: string;
  dataStart: string;
  dataStop: string;
  client: string;
  procentFinalizare: number;
  minuteDurataEstimata: number;
  idDeviz: number;
  anDeviz: number;
  responsabilActivitate: number;
  idActivitateInceputa: number;

  dateDeviz: EvidentaDeviz | null;
}

export interface EvidentaDeviz {
  pozitia: number;
  idDeviz: number;
  numarDeviz: number;
  dataDeviz: string;
  codPart: number;
  client: string;
  numeDeviz: string;
  detaliiDeviz: string;
  idPunctDeLucru: number;
  denumirePunctDeLucru: string;
  adresa: string;
  numarDosar: number;
  latitudinePunctDeLucru: number;
  longitudinePunctDeLucru: number;
  idActivitateInceputa: number;
  responsabilActivitate: number;
  procentFinalizare: number;
}

export interface IInterogareActivitati {
  CodSal: number;
  DeLa: string;
  PanaLa: string;
}

export type IStatusKanban = "Open" | "InProgress" | "Close";
export type IColorKanban = "blue" | "red" | "orange";

export interface IKanbanActivitate {
  Id: string;
  Status: IStatusKanban;
  Summary: string;
  Tags: string;
  Color: string;
  ClassName: string;
  TodoId: number;
  idDeviz: number;
}
