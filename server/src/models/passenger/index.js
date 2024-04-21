import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import userModel from "../user/index.js";
import ticketModel from "../ticket/index.js";
import seatModel from "../seat/index.js";
const passengerModel = sequelize.define('Passenger', {
  idCardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }, fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
userModel.hasOne(passengerModel);
passengerModel.belongsTo(userModel);
passengerModel.hasMany(seatModel);
seatModel.belongsTo(passengerModel);
export default passengerModel;
