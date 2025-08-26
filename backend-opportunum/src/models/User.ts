import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interface/User';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['assistant'], 
    enum: ['master', 'admin', 'assistant']
  },
  teams: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
