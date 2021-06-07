const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const { DB_TABLES } = require("../config/constant");

const Link = sequelize.define(DB_TABLES.LINK, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
}, {
  timestamps: false,
  tableName: DB_TABLES.LINK,
});

module.exports = Link;
