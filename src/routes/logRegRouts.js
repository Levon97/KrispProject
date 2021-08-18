const router = require('express').Router();
const { registration,logIn,profile} = require('../controllers/logRegController');

router.post('/registration', registration);
router.post('/login',logIn);
// router.get('profile',profile);

module.exports = router;