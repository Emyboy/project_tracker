import express from 'express';
import ProjectController from '../controllers/project.controller';
import UserMiddleware from '../middlewares/user.middleware';

const {
    verifyAuthHeader
} = UserMiddleware;

const {
    createProject,
    getAUserProjects,
    editUserProject,
    deleteProject
} = ProjectController;
const projectRoute = express.Router();

projectRoute.delete('/project/:project_id', verifyAuthHeader, deleteProject);
projectRoute.put('/project/:project_id/:user_id', verifyAuthHeader, editUserProject);
projectRoute.post('/project/:user_id', verifyAuthHeader, createProject);
projectRoute.get('/project/:user_id', verifyAuthHeader,  getAUserProjects);

export default projectRoute;
