import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectsRoutes';
import userRoutes from "./routes/userRoutes";
import taskRoutes from './routes/taskRoutes';
import connectDB from './config/db';

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://opportunum.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});