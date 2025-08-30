import { Schema, model } from 'mongoose';
import { IProject } from '../interface/Project';

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  municipio: {          
    type: String,
    required: true,
    trim: true
  },
  perspectiva: {
    type: String,
    trim: true
  },
  numeroEstrategia: {
    type: String,
    trim: true
  },
  resultadoChave: {
    type: String,
    trim: true
  },
  objetivo: {
    type: String,
    trim: true
  },
  objetivoEstrategico: {
    type: String,
    trim: true
  },
  estrategia: {
    type: String,
    trim: true
  },
  prazo: {
    type: Date
  },
  responsavel: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export const Project = model<IProject>('Project', projectSchema);
