const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./configShared.development.js');
} else {
    module.exports = require('./configShared.js');
}