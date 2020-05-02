import express from 'express';
import taskController from '../controllers/task.controller';
import UserMiddlware from '../middlewares/user.middleware';

const taskRoute = express.Router();
const { verifyAuthHeader } = UserMiddlware;

const {
    addTask,
    getAllProjectTasks,
    editTask,
    deleteTask
} = taskController;

taskRoute.post('/task/:project_id', verifyAuthHeader, addTask);
taskRoute.get('/task/:project_id', verifyAuthHeader, getAllProjectTasks);
taskRoute.put('/task/:task_id', verifyAuthHeader, editTask);
taskRoute.delete('/task/:task_id', verifyAuthHeader, deleteTask);

export default taskRoute;
