const dbConfigs = require('../configs/db.configs');
const Sequelize = require("sequelize");
const userModel = require('./userModel');

// DB configurations woth Sequelize 
const sequelize = new Sequelize(dbConfigs.DB, dbConfigs.USER, dbConfigs.PASSWORD, {
    host: dbConfigs.HOST,
    dialect: dbConfigs.dialect,

    pool: {
        max: dbConfigs.pool.max,
        min: dbConfigs.pool.min,
        acquire: dbConfigs.pool.acquire,
        idle: dbConfigs.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = userModel(sequelize,Sequelize);

module.exports = db;