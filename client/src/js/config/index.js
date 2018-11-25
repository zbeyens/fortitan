const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./configClient.development.js');
} else {
    module.exports = require('./configClient.js');
}