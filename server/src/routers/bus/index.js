import { Router } from "express";
import busController from "../../controllers/bus/index.js";
import AuthenticateMiddleware from "../../middlewares/authentication/index.js";
import adminRoleMiddleware from "../../middlewares/adminRole/index.js";
import busValidator from "../../validators/bus/index.js";
const busRouter = Router();
busRouter.post("/busadd",AuthenticateMiddleware,adminRoleMiddleware,busValidator.create,busController.create);
export default busRouter; 