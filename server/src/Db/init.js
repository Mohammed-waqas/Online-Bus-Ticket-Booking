import busModel from "../models/bus/index.js";
import passengerModel from "../models/passenger/index.js";
import paymentModel from "../models/payment/index.js";
import busRouteModel from "../models/route/index.js";
import scheduleModel from "../models/schedule/index.js";
import seatModel from "../models/seat/index.js";
import ticketModel from "../models/ticket/index.js";
import adminModel from "../models/admin/index.js";
import userModel from "../models/user/index.js";

const dbInit = async () => {
    await busModel.sync({ alter: true, force: false });
    await seatModel.sync({ alter: true, force: false });
    await passengerModel.sync({ alter: true, force: false });
    await paymentModel.sync({ alter: true, force: false });
    await busRouteModel.sync({ alter: true, force: false });
    await scheduleModel.sync({ alter: true, force: false });
    await ticketModel.sync({ alter: true, force: false });
    await adminModel.sync({ alter: true, force: false });
    await userModel.sync({ alter: true, force: false });
    console.log("The table for the model was just created!")
};
export default dbInit;    