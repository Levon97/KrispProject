const User = require('../models/index');
const { redisDel } = require ('../helpers/redisAsync');

async function profile (req,res) {
   const validToken =  await req.header("auth-token");
   if(!validToken) return res.status(401).json({error: 'Unauthorized'});

    try {
        const user = await User.findOne({ where: { email: email } });
        res.status(200).json({ data: user });
    } catch (error) {
        
    }
}

async function logOut(req,res){
    const validToken =  await req.header("auth-token");
    
    try {
        redisDel(validToken);
        res.status(200);
    } catch (err) {
        console.log(err);
    }
    
}

module.exports = {
    profile,
    logOut
}
