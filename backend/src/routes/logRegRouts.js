const router = require('express').Router();
const { registration,logIn} = require('../controllers/logRegController');
const {profile,logOut} = require('../controllers/profileController');

router.post('/registration', registration);
router.post('/login',logIn);
router.post('/profile',profile);
router.post('/logout',logOut);

module.exports = router;