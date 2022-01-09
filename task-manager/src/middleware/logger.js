const fs = require('fs');

const Logger = (req, res, next) => {
    const dateNow = new Date().toLocaleString();
    console.log(`${req.method} ${req.path} ${req.ip} ${dateNow}`);

    fs.createWriteStream('log.txt', { flags: 'a' }).write(`${req.method}, ${req.path}, ${req.ip}, ${dateNow}\n`);
    
    next();

}

module.exports = Logger;