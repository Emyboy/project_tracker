import express from 'express';
import userRoutes from './user.route';
import projectRoute from './project.route';

const apiRoutes = express.Router();

apiRoutes.use(userRoutes);
apiRoutes.use(projectRoute);

export default apiRoutes;
