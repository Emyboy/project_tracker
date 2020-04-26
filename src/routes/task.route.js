import express from 'express';
import taskController from '../controllers/task.controller';
const taskRoute = express.Router();

const {
    addTask,
    getAllProjectTasks,
    editTask,
    deleteTask
} = taskController;

taskRoute.post('/task/:project_id', addTask);
taskRoute.get('/task/:project_id', getAllProjectTasks);
taskRoute.put('/task/:task_id', editTask);
taskRoute.delete('/task/:task_id', deleteTask);

export default taskRoute;
