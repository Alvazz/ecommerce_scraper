const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const { DB_TABLES } = require("../config/constant");
const Link = require("./link");

const Product = sequelize.define(DB_TABLES.PRODUCT, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  current_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lowest_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  site: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  tableName: DB_TABLES.PRODUCT,
});

Product.belongsTo(Link, { foreignKey: 'link_id' });

module.exports = Product;
