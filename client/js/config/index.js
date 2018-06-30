const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./cConfig.development.js');
} else {
    module.exports = require('./cConfig.global.js');
}