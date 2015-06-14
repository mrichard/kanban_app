var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var merge = require('./utils/merge');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
	entry: [path.resolve(ROOT_PATH, 'app/main.js')],
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
			})
		]
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
					test: /\.jsx|\.js$/,
					loaders: ['eslint-loader', 'jscs-loader'],
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