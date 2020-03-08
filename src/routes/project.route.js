import express from 'express';
import ProjectController from '../controllers/project.controller';

const {
    createProject,
    getUserProject
} = ProjectController;
const projectRoute = express.Router();

projectRoute.post('/project/:user_id', createProject);
projectRoute.get('/project/:user_id', getUserProject);

export default projectRoute;
