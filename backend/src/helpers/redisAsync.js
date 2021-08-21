const {promisify} = require('util');
const client = require('redis').createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT
});

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisDel = promisify(client.del).bind(client);

module.exports = {
    redisGet,
    redisSet,
    redisDel
};