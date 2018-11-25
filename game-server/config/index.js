const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./configServer.development.js');
} else {
    module.exports = require('./configServer.js');
}