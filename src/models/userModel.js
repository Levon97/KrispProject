 module.exports = (sequelize,Sequelize) =>{
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING(25)
        },
        lastName: {
            type: Sequelize.STRING(25)
        },
        email: {
            type: Sequelize.STRING(80)
        },
        password: {
            type: Sequelize.CHAR(60)
        },
        sex: {
            type: Sequelize.CHAR(1)
        },
        birth: {
            type: Sequelize.DATE
        }
      });

      return User;
  }