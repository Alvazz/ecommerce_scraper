const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const { DB_TABLES } = require("../config/constant");

const created = new Date();
const expiry = new Date().setMinutes(created.getMinutes()+6);

const UserVerification = sequelize.define(DB_TABLES.USER_VERIFICATION, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: created,
  },
  expire_at: {
    type: DataTypes.DATE,
    defaultValue: expiry,
  },
  is_revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: false,
  tableName: DB_TABLES.USER_VERIFICATION,
});

module.exports = UserVerification;
