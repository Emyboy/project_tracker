import express from 'express';
import userController from '../controllers/user.controller';

const userRoutes = express.Router();
const { 
    signupUser
} = userController;

userRoutes.post('/signup', signupUser);

export default userRoutes;
