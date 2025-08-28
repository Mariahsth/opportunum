import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = express.Router();

router.post('/', createTask);
router.get('/:projId', getTasksByProject);
router.put('/:id', updateTask);
router.delete('/:id', authorizeRoles( "master", "admin"), deleteTask);

export default router;
