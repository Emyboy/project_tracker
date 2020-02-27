import express from 'express';
import userRoutes from './user.route';

const apiRoutes = express.Router();

apiRoutes.use(userRoutes);

export default apiRoutes;
