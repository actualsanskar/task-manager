import express from 'express';
import authUser from '../middlewares/auth.middleware.js';
import { addTask, allTasks, deleteTask, specificTask, updateTask } from '../controllers/task.controllers.js';
const route = express.Router();

route.post('/add-task', authUser, addTask);
// route.get('/tasks', authUser, allTasks);
// route.get('/tasks/:id', authUser, specificTask);
// route.put('/tasks/:id', authUser, updateTask);
// route.delete('/tasks/:id', authUser, deleteTask);

export default route