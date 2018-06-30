const express = require('express'),
app = express(),
path = require('path'),
bodyParser = require('body-parser'),
favicon = require('serve-favicon'),
logger = require('morgan'),
helmet = require('helmet');



const Routes = require('./server/routes/routes.js');
app.use(helmet({
    frameguard: false
})); //protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}

app.use(favicon(path.join(__dirname, '/client/img/icons/icon-32.png')));
app.use(bodyParser.json()); //support json-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); //support url-encoded bodies

app.use('/client', express.static(path.join(__dirname, '/client'), {
    maxAge: '1h'
}));
app.use('/build', express.static(path.join(__dirname, '/build')));

//for development hot reloading
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    //dev
    const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./webpack.config.development');

    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        filename: webpackConfig.output.filename,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}

const routes = new Routes();
routes.init(app);

app.listen(3000, () => {
});

