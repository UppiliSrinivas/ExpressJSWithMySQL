const { Sequelize } = require("sequelize");
const env = require("dotenv").config();

const sequelize = new Sequelize(
  'user_db',
  'root',
  'root',
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false, // Disable logging; default: console.log
  }
);

module.exports = sequelize;
