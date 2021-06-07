const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = require("./product");
const Users = require("./users");

const { DB_TABLES } = require("../config/constant");

const Choice = sequelize.define(DB_TABLES.CHOICE, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: DB_TABLES.CHOICE,
});

Choice.belongsTo(Product, { foreignKey: "product_id" });
Choice.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Choice;
