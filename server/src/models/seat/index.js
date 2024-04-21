import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import busModel from "../bus/index.js";
const seatModel = sequelize.define('Seat', {
  seatNumber: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  seatType: {
    type: DataTypes.ENUM('window', 'aisle'),
    allowNull: false
  },
  availabilityStatus: {
    type: DataTypes.ENUM('booked', 'reserved', 'available'),
    allowNull: false
  }
});
busModel.hasMany(seatModel);
seatModel.belongsTo(busModel);
export default seatModel;
