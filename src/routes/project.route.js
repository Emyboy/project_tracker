import express from 'express';
import ProjectController from '../controllers/project.controller';
import UserMiddleware from '../middlewares/user.middleware';

const {
    verifyAuthHeader
} = UserMiddleware;

const {
    createProject,
    getAllUsersProjects,
    getAUserProject
} = ProjectController;
const projectRoute = express.Router();

projectRoute.post('/project/:user_id', verifyAuthHeader, createProject);
projectRoute.get('/project/:user_id',  getAllUsersProjects);
projectRoute.get('/project/:user_id/:project_id', getAUserProject);

export default projectRoute;
