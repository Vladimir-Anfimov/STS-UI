export interface IParamsActivitate {
  id_activitate: string;
}

export interface IIncepeActivitate {
  CodSal: number;
  IdDecont: number;
  IdTodo: number;
}

export interface IInchideActivitate {
  CodSal: number;
  IdDecont: number;
  Observatii: string;
  Concluzii: string;
  ResponsabilActivitate: number;
  ProcentFinalizare: number;
  IdTodo: number;
}

export interface IInputActivitate {
  Observatii: string;
  Concluzii: string;
  ProcentFinalizare: number;
}
