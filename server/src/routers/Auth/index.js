import { Router } from "express";
import authController from "../../controllers/Auth/index.js";
import authValidator from "../../validators/Auth/index.js";
const authRouter = Router();
authRouter.post("/login",authValidator.login, authController.login);
export default authRouter;