export interface IStartAct {
  CodSal: number;
  IdDecont: number;
}

export interface IStopAct {
  CodSal: number;
  IdDecont: number;
  Observatii: string;
  Concluzii: string;
  ProcentFinalizare: number;
  ResponsabilActivitate: number;
}

export interface PersoanaLegaturaDeviz {
  persoanaDeLegatura: string;
  telefon1: string;
  telefon2: string;
}

export interface IUpdateCoordonate {
  IdDeviz: number;
  Latitudine: number;
  Longitudine: number;
}

export interface IncarcaDevize {
  CodSal: number;
  Status: number;
  TipLucrare: number;
}

export interface IFilterGPS {
  LatitudineEchipaj: number;
  LongitudineEchipaj: number;
  RazaCautareKm: string; // mentinuta in format string pt ca inputul sa poate afisa un text gol
}
