var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var merge = require('./utils/merge');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
    entry: [path.resolve(ROOT_PATH, 'app/main.jsx')],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};

var mergeConfig = merge.bind(null, common);

if (TARGET === 'build') {
    module.exports = mergeConfig({
        plugins: [
            new HtmlWebpackPlugin({
                title: 'KanBan Application',
                template: path.join(ROOT_PATH, 'app/index.tpl')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    include: path.join(ROOT_PATH, 'app')
                }
            ]
        }
    });
}

if (TARGET === 'dev') {
    var IP = '0.0.0.0';
    var PORT = 8080;

    module.exports = mergeConfig({
        ip: IP,
        port: PORT,
        entry: [
            'webpack-dev-server/client?http://' + IP + ':' + PORT,
            'webpack/hot/dev-server'
        ],
        module: {
            preLoaders: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['eslint-loader', 'jscs-loader'],
                    include: path.join(ROOT_PATH, 'app')
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    include: path.join(ROOT_PATH, 'app')
                }
            ]
        },
        output: {
            path: __dirname,
            filename: 'bundle.js',
            publicPath: '/dev_server/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });
}
