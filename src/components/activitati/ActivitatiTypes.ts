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
  dateDeviz: EvidentaDeviz;
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
  DeLa: Date;
  PanaLa: Date;
}

export type IStatusKanban = "Open" | "InProgress" | "Close";
export type IColorKanban = "blue" | "red" | "orange";

export interface IKanbanActivitate {
  Id: string;
  Status: IStatusKanban;
  Summary: string;
  Tags: string;
  Color: string;
  ClassName: "";
  TodoId: number;
}
