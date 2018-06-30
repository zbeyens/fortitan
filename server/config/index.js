const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./sConfig.development.js');
} else {
    module.exports = require('./sConfig.global.js');
}