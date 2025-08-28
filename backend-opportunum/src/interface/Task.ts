import { Types } from "mongoose";

export interface ITask {
    _id?: string;
    projId: Types.ObjectId; 
    prazo?: Date | string;
    KR: string;
    resultados: string;
    responsaveis: Types.ObjectId[]; 
    status: 'pendente' | 'em andamento' | 'concluído'; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  