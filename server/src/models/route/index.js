import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import busModel from "../bus/index.js";
const busRouteModel =sequelize.define('Bus_Route', {
  startDestination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endDestination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
  
});
busModel.hasOne(busRouteModel);
busRouteModel.belongsTo(busModel);
export default busRouteModel;
  