module.exports = {
    HOST: "localhost",
    USER: "loqshman",
    PASSWORD: "loqshman111",
    DB: "database_development",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };