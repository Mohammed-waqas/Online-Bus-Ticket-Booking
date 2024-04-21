import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
const busModel = sequelize.define('Bus', {
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}); 
export default busModel;
