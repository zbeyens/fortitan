const configGlobal = require('./config.global.js');

const config = {
    env: 'development',

};

Object.assign(configGlobal, config); 

module.exports = configGlobal;