import express  from "express";
import { authUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/user',authUser);

export default userRouter;