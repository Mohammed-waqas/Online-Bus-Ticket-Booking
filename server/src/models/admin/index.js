import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import userModel from "../user/index.js";
const adminModel =sequelize.define('Admin', {
  contactDetails: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
userModel.hasOne(adminModel);
adminModel.belongsTo(userModel);
export default adminModel;
  