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

projectRoute.put('/project/:project_id/:user_id', editUserProject);
projectRoute.post('/project/:user_id', verifyAuthHeader, createProject);
projectRoute.get('/project/:user_id',  getAUserProjects);
projectRoute.delete('/project/:project_id', deleteProject);

export default projectRoute;
