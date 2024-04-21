import { Router } from "express";
import AuthenticateMiddleware from "../../middlewares/authentication/index.js";
import busRouteController from "../../controllers/busRoute/index.js";
import adminRoleMiddleware from "../../middlewares/adminRole/index.js";
import busrouteValidator from "../../validators/busroute/index.js";
const busRouteRouter = Router();
busRouteRouter.post("/busrouteadd", AuthenticateMiddleware,adminRoleMiddleware,busrouteValidator.create, busRouteController.create);
busRouteRouter.get("/busroute",AuthenticateMiddleware,busRouteController.get);
export default busRouteRouter;  