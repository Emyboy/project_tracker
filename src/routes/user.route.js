import express from 'express';
import userController from '../controllers/user.controller';
import userMiddleware from '../middlewares/user.middleware';

const userRoutes = express.Router();
const { 
    signupUser,
    loginUser,
    getUserById,
    updateUserProfile,
    deleteUserProfile
} = userController;
const {
    verifyAuthHeader
} = userMiddleware;

userRoutes.post('/signup', signupUser);
userRoutes.get('/login', loginUser);
userRoutes.get('/user/:user_id', verifyAuthHeader, getUserById);
userRoutes.put('/user/:user_id',verifyAuthHeader, updateUserProfile);
userRoutes.delete('/user/:user_id', verifyAuthHeader, deleteUserProfile);

export default userRoutes;
