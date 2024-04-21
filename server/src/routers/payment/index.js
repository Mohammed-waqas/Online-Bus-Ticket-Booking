import { Router } from "express";
import AuthenticateMiddleware from "../../middlewares/authentication/index.js";
import paymentController from "../../controllers/payment/index.js";
import passengerRoleMiddleware from "../../middlewares/passengerRole/index.js";
import paymentValidator from "../../validators/payment/index.js";
const paymentRouter = Router();
paymentRouter.post("/payment", AuthenticateMiddleware,passengerRoleMiddleware,paymentValidator.create, paymentController.create);
export default paymentRouter;   