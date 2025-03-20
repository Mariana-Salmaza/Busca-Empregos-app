import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER || "user_undefined";
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DB_NAME = process.env.DB_NAME || "name_unedfined";
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_USER_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: console.log,
});

export default sequelize;
