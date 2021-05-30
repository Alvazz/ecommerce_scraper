const { Sequelize } = require("sequelize");

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER, DB_DIALECT } = require("../config/env");

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});
