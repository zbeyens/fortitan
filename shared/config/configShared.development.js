const configGlobal = require('./configShared.js');

const config = {
    env: 'development',

};

Object.assign(configGlobal, config); 

module.exports = configGlobal;