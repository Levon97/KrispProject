const Joi = require('joi');

// checking registration input data validation 
function registrationValidation(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(45).required(),
        lastName: Joi.string().min(3).max(45).required(),
        email: Joi.string().min(6).max(80).required().email(),
        password: Joi.string().min(6).max(30).required(),
        sex: Joi.string().min(1).max(1).required(),
        birth: Joi.required()

    })

    return schema.validate(data);
}

// checking email  validation  when logining
function loginValidation(data) {

    const schema = Joi.object({
        email: Joi.string().min(6).max(30).required().email()
    });


    return schema.validate(data);
}

module.exports = {
    registrationValidation,
    loginValidation
}