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
  return db.createTable(DB_TABLES.LINK, {
    id: { type: DB_TYPE.INTEGER, autoIncrement: true, primaryKey: true },
    url: { type: DB_TYPE.TEXT, notNull: true },
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
