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
  return db.createTable(DB_TABLES.PRODUCT, {
    id: { type: DB_TYPE.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DB_TYPE.STRING, notNull: true },
    current_price: { type: DB_TYPE.STRING, notNull: true },
    lowest_price: { type: DB_TYPE.STRING, notNull: true },
    site: { type: DB_TYPE.STRING, notNull: true },
    link_id: { type: DB_TYPE.INTEGER, notNull: true },
  });
};

exports.down = function(db) {
  return db.dropTable(DB_TABLES.PRODUCT);
};

exports._meta = {
  "version": 1
};
