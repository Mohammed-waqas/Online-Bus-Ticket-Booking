import { Router } from "express";
import passengerController from "../../controllers/passenger/index.js";
import AuthenticateMiddleware from "../../middlewares/authentication/index.js";
import passengerRoleMiddleware from "../../middlewares/passengerRole/index.js";
import passengerValidator from "../../validators/passenger/index.js";
const passengerRouter = Router();
passengerRouter.post("/pinfo",AuthenticateMiddleware,passengerRoleMiddleware,passengerValidator.create,passengerController.create);
export default passengerRouter; 