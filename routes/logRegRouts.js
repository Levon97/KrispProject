const router = require('express').Router();
const { registration,logIn } = require('../controllers/logRegController');


router.post('/registration', registration)

module.exports = router;