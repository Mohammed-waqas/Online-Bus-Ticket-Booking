import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import seatModel from "../seat/index.js";
import passengerModel from "../passenger/index.js";
const ticketModel =sequelize.define('Ticket', {
  departureInformation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  arrivalInformation: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default ticketModel;
   