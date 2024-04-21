import { Router } from "express";
import userController from "../../controllers/user/index.js";
import userValidator from "../../validators/user/index.js";
const userRouter = Router();
userRouter.post("/signup",userValidator.signup, userController.create);
export default userRouter; 