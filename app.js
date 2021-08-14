require('dotenv').config()

const express = require("express");
const app = express();
const db = require('./src/models/index');
const port = process.env.PORT || 3000;


// DB conection with async/await for matching project structure
(async () => {
  try {
      await db.sequelize.sync();
      app.listen(port, () => {
          console.log(`Server is running ${port}`);
        });
  } catch (err) {
      console.log('Connection to DB Failed');
  }
})();






