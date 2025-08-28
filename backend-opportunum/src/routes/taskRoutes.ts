import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controllers/taskController';

const router = express.Router();

router.post('/', createTask);
router.get('/:projId', getTasksByProject);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
