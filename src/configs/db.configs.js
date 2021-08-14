module.exports = {
    HOST: "localhost",
    USER: "loqshman",
    PASSWORD: "loqshman111",
    DB: "KrispProject",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };