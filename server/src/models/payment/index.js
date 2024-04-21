import sequelize from "../../Db/config.js";
import { DataTypes } from "sequelize";
import passengerModel from "../passenger/index.js";
import seatModel from "../seat/index.js";
const paymentModel = sequelize.define('Payment', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  transactionStatus: {
    type: DataTypes.ENUM('success', 'failed'),
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});
seatModel.hasOne(paymentModel);
paymentModel.belongsTo(passengerModel);
passengerModel.hasMany(paymentModel);
paymentModel.belongsTo(passengerModel);
export default paymentModel;
