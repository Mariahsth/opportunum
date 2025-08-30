import { Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  municipio:string;
  perspectiva?: string;
  numeroEstrategia?: string;
  resultadoChave?: string;
  objetivo?: string;
  objetivoEstrategico?: string;
  estrategia?: string;
  prazo?: Date;
  responsavel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
