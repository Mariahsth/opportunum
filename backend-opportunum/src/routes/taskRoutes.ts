import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createTask);
router.get('/:projId', getTasksByProject);
router.put('/:id', updateTask);
router.delete('/:id', protect, authorizeRoles( "master", "admin"), deleteTask);

export default router;
