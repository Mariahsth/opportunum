export interface ITask {
    _id?: string;
    projId: string;
    prazo?: string | Date;
    KR: string;
    resultados: string;
    responsaveis: Array<{ _id: string; name: string; email: string } | string>; 
    status: "pendente" | "em andamento" | "concluído";
    createdAt?: string;
    updatedAt?: string;
  }
  