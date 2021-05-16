const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const { DB_TABLES } = require('../config/constant');

const Users = sequelize.define(DB_TABLES.USERS, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: DB_TABLES.USERS,
});

const UserVerification = require("./user_verification");
UserVerification.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Users;
