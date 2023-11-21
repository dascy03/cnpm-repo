// userRouter.js
import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.displayAllUsers);
userRouter.post("/login", userController.handleLogin);

export default userRouter;
