const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const { DB_TABLES } = require("../config/constant");

const Link = sequelize.define(DB_TABLES.LINK, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: DB_TABLES.LINK,
});

module.exports = Link;
