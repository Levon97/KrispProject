const User = require('../models/index');
const { redisDel } = require ('../helpers/redisAsync');

async function profile (req,res) {
  const email = req.email;

 try {
        const user = await User.findOne({ where: { email:email } });
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(401).json({error: "Unauthorized"})
    }
}

async function logOut(req,res){
    const validToken = req.validToken;
    
    try {
        await redisDel(validToken);
        res.status(200).json({data: "log out, token deleted"});
    } catch (err) {
        es.status(400).json({error: "cant log out"})
        console.log(err);
    }
    
}

module.exports = {
    profile,
    logOut
}
