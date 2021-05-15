'use strict';

const { DB_TABLES, DB_TYPE } = require("../config/constant");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable(DB_TABLES.USERS, {
    id: { type: DB_TYPE.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DB_TYPE.STRING, notNull: true },
    last_name: { type: DB_TYPE.STRING, notNull: true },
    email: { type: DB_TYPE.STRING, notNull: true },
    phone: { type: DB_TYPE.STRING, notNull: false },
    is_active: { type: DB_TYPE.BOOLEAN, defaultValue: false },
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
