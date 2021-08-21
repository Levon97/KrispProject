const router = require('express').Router();
const {profile,logOut} = require('../controllers/profileController');
const tokenValidation = require('../middlewares/tokenValidation');


router.use(tokenValidation);
router.get('/profile',profile);
router.get('/logout',logOut);

module.exports = router;