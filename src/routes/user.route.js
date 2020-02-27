import express from 'express';
import userController from '../controllers/user.controller';

const userRoutes = express.Router();
const { 
    signupUser,
    loginUser
} = userController;

userRoutes.post('/signup', signupUser);
userRoutes.get('/login', loginUser);

export default userRoutes;
