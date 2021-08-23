const {redisGet} = require('../helpers/redisAsync');

// Token validation middleware 
async function verifyToken(req,res,next) {
    
    const validToken = req.header('auth-token');
    if(!validToken) return res.status(401).json({error: 'Unauthorized'});

    const email = await redisGet(validToken);
    if(!email) return res.status(401).json({error: 'Unauthorized'})

    try {
        req.email = email;
        req.validToken = validToken;
    next()
    } catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
    
}

module.exports = verifyToken;