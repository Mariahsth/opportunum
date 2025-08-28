import { Schema, model } from 'mongoose';
import { ITask } from '../interface/Task';

const taskSchema = new Schema<ITask>({
  projId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  prazo: {
    type: Date,
    required: true
  },
  KR: {
    type: String,
    trim: true
  },
  resultados: {
    type: String,
    required: true,
    trim: true
  },
  responsaveis: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluído'],
    default: 'pendente'
  }
}, { timestamps: true });

export const Task = model<ITask>('Task', taskSchema);
