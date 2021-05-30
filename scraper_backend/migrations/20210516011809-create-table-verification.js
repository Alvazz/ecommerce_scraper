'use strict';

const {
  DB_TABLES,
  DB_TYPE
} = require("../config/constant");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  return db.createTable(DB_TABLES.USER_VERIFICATION, {
    id: { type: DB_TYPE.INTEGER, primaryKey: true, autoIncrement: true },
    otp: { type: DB_TYPE.INTEGER, notNull: true },
    user_id: { type: DB_TYPE.INTEGER, notNull: true },
    created_at: { type: DB_TYPE.DATE_TIME, notNull: true },
    expire_at: { type: DB_TYPE.DATE_TIME, notNull: true },
    is_revoked: { type: DB_TYPE.BOOLEAN, defaultValue: false },
  });
};

exports.down = function(db) {
  return db.dropTable(DB_TABLES.USER_VERIFICATION);
};

exports._meta = {
  "version": 1
};
