const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 13;

async function registration(req,res){ 
    const inputData = await req.body;
    const user = await Project.findOne({ where: { email: inputData.email } });
    
    // checking is there a user with inputed email
    if(user === null){
       await bcrypt.hash(inputData.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });
    } else {
        
    }
    
}