import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByEmployee,
  getTaskStats,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/stats/dashboard', getTaskStats);
router.get('/employee/:employeeId', getTasksByEmployee);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;