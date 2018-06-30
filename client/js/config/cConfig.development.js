let config = require('./cConfig.global.js');

/**
 * Client config for development
 * @type {Object}
 */
const configDev = {
    env: 'development',

    showStats: true,
};

config = Object.assign(config, configDev); 

console.log(config.env);

module.exports = config;