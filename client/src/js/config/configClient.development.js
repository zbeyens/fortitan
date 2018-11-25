const configGlobal = require('./configClient.js');

const config = {
    env: 'development',

};

Object.assign(configGlobal, config); 

module.exports = configGlobal;