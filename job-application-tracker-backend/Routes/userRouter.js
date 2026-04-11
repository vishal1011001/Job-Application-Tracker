import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);

userRouter.get('/users/me', protect, getUser);

export default userRouter;