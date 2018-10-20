let config = require('./config.global.js');

config.env = 'development';

const configDev = {
    
};

config = Object.assign(config, configDev); 

module.exports = config;