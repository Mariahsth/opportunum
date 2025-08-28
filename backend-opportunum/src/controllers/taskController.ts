import { Request, Response } from 'express';
import { Task } from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    const populatedTask = await task.populate('responsaveis', 'name email'); 
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projId } = req.params;
    const tasks = await Task.find({ projId })
      .populate('responsaveis', 'name email'); 
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tarefas do projeto' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('responsaveis', 'name email');
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
