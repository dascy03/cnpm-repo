// userRouter.js
import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/list", userController.displayAllUsers);
userRouter.post("/login", userController.handleLogin);
userRouter.post("/info", userController.displayUserInfo);
userRouter.post("/update", userController.updateUserInfo);

export default userRouter;
