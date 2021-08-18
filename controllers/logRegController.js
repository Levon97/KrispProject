const {User} = require('../models/index')
const bcrypt = require('bcrypt');
const {registrationValidation,loginValidation} = require('../validations/inputDataValidation');

async function registration(req,res){ 
    const inputData = await req.body;

    // checking inputed data for registration valide or not
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).json({ error: error.details});
    
    // checking is there a user with inputed email
    const isEmailExist = await User.findOne({ where: { email: req.body.email } });
    if (isEmailExist) return res.status(409).json({ error: "Email already exists" });

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

module.exports = {
    registration
}