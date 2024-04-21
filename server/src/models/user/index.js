import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
const userModel = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    email:{type: DataTypes.STRING,
    allowNull: false,
    unique: true},
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
    role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default userModel; 
  