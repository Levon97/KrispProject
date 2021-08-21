const {promisify} = require('util');
const randomBytesAsync = promisify(require('crypto').randomBytes);

async function getToken(size){
    const key =  await randomBytesAsync(size);
    return key.toString('hex');
}

module.exports = getToken;