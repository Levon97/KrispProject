const User = require('../models/index')
const bcrypt = require('bcrypt');
const registrationValidation= require('../validations/inputDataValidation');
const getToken = require('../helpers/tokenCreator.js');
const {redisSet} = require ('../helpers/redisAsync');

async function registration(req,res){ 

    // checking inputed data for registration valide or not
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message});
    
    // checking is there a user with inputed email
    const isEmailExist = await User.findOne({ where: { email: req.body.email } });
    if (isEmailExist) return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(13);
    const password = await bcrypt.hash(req.body.password, salt);

    // using buind to creat user by inputed data and than checking with try/catch bay save method
    const regUser = await User.build({
        name: req.body.name,
        lastName: req.body.lastName,
        email:req.body.email,
        password: password,
        sex: req.body.sex,
        birth: req.body.birth
        });
    try {
        await regUser.save();
        res.status(200).json({ data: regUser });
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
}

async function logIn(req,res) {
//validastion for required email and pass

    // checking is there a user with inputed email
    const user = await User.findOne({ where: { email: req.body.email } });
    if(!user)return res.status(401).json({error: "wrong Email"});
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(401).json({error: 'Wrong password'});
    
    try {
        const token = await getToken(48);
        await redisSet(token, req.body.email, 'EX', 60*60);  //setAsync
        res.json({
            error: null,
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
    
}

module.exports = {
    registration,logIn
}


// single handler for succes and errors

// error handling normal 
