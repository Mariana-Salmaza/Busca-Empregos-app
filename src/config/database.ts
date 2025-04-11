import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const DB_NAME = isTest
  ? process.env.DB_NAME_TEST || "busca_empregos_test"
  : process.env.DB_NAME || "busca_empregos";

const DB_USER = process.env.DB_USER || "root";
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_USER_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: !isTest,
  dialectOptions: {
    charset: "utf8mb4",
  },
});

export default sequelize;
