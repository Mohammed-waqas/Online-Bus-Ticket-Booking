import Sequelize from "sequelize";
const env = process.env;
const sequelize = new Sequelize("busticketsystem", "postgres", "waqas123", {
  host: "localhost",
  dialect: "postgres",
});
const Dbconnection = async (res, req) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default sequelize;
export { Dbconnection };
