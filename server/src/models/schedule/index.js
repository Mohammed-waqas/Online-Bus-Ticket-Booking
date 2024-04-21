import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import busRouteModel from "../route/index.js";
const scheduleModel = sequelize.define('Schedule', {
  departureTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  arrivalTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
busRouteModel.hasMany(scheduleModel);
scheduleModel.belongsTo(busRouteModel);
export default scheduleModel;
    