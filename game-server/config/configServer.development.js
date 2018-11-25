const configGlobal = require('./configServer.js');

const config = {
    env: 'development',

};

Object.assign(configGlobal, config); 

module.exports = configGlobal;