const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT
});

 client.set("gaggul", "gugo" )


module.exports = client;