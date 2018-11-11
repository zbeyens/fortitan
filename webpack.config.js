const webpack = require('webpack');
const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV || "development";

const ENTRY_FILE = path.resolve(__dirname, 'client/src/js/app.js');
const BUILD_DIR = path.resolve(__dirname, 'client/dist'); //rename to public

const config = {
    mode: env,

    entry: [
        //connect to the server to receive bundle rebuild notifications
        ENTRY_FILE,
    ],

    output: {
        //path of the bundle, otherwise it's stocked in memory
        path: BUILD_DIR,
        filename: 'bundle.js',
        // hot update route
        publicPath: '/dist',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(),
            'node_modules',
            'iogine'
        ],
    },

    module: {
        rules: [
            // Javascript
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                // include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
            },
            // CSS
            // {
            //     test: /\.css$/,
            //     include: path.join(__dirname, 'client'),
            //     loader: 'style-loader!css-loader?' + qs.stringify({
            //         modules: true,
            //         importLoaders: 1,
            //         localIdentName: '[path][name]-[local]'
            //     })
            // }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            }
        })
    ],

    stats: 'errors-only',
};

if (env === 'development') {
    console.log("Webpack: development mode");
    config.entry.push('webpack-hot-middleware/client?reload=true');
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else if (env === 'production') {
    console.log("Webpack: production mode");
} else {
    console.log("Set NODE_ENV to development or production");
}



module.exports = config;