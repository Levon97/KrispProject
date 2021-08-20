const User = require('../models/index');
const client = require('../helpers/redisConnection');

function getCacheById(key) {
    return new Promise((resv, rej) => {
      client.get(key, (err, reply) => {
        resv(reply);
      });
    })
    
  }

async function profile (req,res) {
   const validToken =  await req.header("auth-token");
   if(!validToken) return res.status(401).json({error: 'Unauthorized'});
   
   const email = await req.header("user");
   if(!email) return res.status(401).json({error: 'Unauthorized'});
   
   const redisEmail = await getCacheById(validToken);
   if(redisEmail !== email) return res.status(401).json({error: 'Unauthorized'});

    try {
        const user = await User.findOne({ where: { email: email } });
        res.status(200).json({ data: user });
    } catch (error) {
        
    }
}

async function logOut(req,res){
    const validToken =  await req.header("auth-token");
    
    try {
        client.del(validToken);
        res.status(200);
    } catch (err) {
        console.log(err);
    }
    
}

module.exports = {
    profile,
    logOut
}
