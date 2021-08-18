module.exports = (sequelize, Sequelize) => {
  
  const User = sequelize.define("user",{
    name: {
      allowNull: false,
      type: Sequelize.STRING(45)
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(45)
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(80)
    },
    password: {
      allowNull: false,
      type: Sequelize.CHAR(60)
    },
    sex: {
      allowNull: false,
      type: Sequelize.CHAR(1)
    },
    birth: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
  return User;
};