const router = require('express').Router();
const { registration,logIn} = require('../controllers/logRegController');

router.post('/registration', registration);
router.post('/login',logIn);

module.exports = router;