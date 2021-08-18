require('dotenv').config()

const express = require('express');
const app = express();
const logRegRoutes = require ('./routes/logRegRouts')
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/',logRegRoutes);



(async () => {
  try {
      app.listen(port, () => {
          console.log(`Server is running ${port}`);
        });
  } catch (err) {
      console.log(err);
  }
})();



const crypto = require('crypto')


const gago = crypto.randomBytes(48).toString('base64');

console.log(gago);


