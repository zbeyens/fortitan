let config = require('./config.global.js');

const configDev = {
    env: 'development',

    // showStats: true,
};

config = Object.assign(config, configDev); 

module.exports = config;