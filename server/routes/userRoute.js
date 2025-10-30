import express from 'express';
import { adminLogin, loginUser, registerAdmin, registerUser } from '../controllers/userController.js';

// create router
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/adminregister', registerAdmin)
userRouter.post("/admin", adminLogin);

export default userRouter