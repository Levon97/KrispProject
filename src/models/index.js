const dbConfigs = require('../config/db.configs');
const Sequelize = require("sequelize");
const userModel = require('./user')
// DB configurations with Sequelize 
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

module.exports = userModel(sequelize,Sequelize);

