require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const logReg = require ('./routes/logRegRouts');
const profileLogout = require('./routes/profileLogoutRouts');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/',logReg);
app.use('/',profileLogout);

  try {
      app.listen(port, () => {
          console.log(`Server is running on ${port}`);
        });
  } catch (err) {
      console.log(err);
  }

  


