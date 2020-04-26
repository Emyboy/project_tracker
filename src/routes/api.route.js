import express from 'express';
import userRoutes from './user.route';
import projectRoute from './project.route';
import taskRoute from './task.route';

const apiRoutes = express.Router();

apiRoutes.use(userRoutes);
apiRoutes.use(projectRoute);
apiRoutes.use(taskRoute);

export default apiRoutes;
