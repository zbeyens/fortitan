const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./config.development.js');
} else {
    module.exports = require('./config.global.js');
}