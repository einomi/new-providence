'use strict';
import fs from 'fs'
import webpack from 'webpack'
import path from 'path'

import { IS_PRODUCTION } from './config'

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appNodeModules = resolveApp('node_modules');

const PATHS = {
	app: path.resolve(__dirname, 'src/media/js/')
};

let plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		TweenMax: 'TweenMax',
	})
];

if (IS_PRODUCTION) {
    plugins.push(
	    new webpack.optimize.UglifyJsPlugin({
		    minimize: true,
		    beautify: false,
		    compress: true,
		    comments: false,
		    parallel: {
			    cache: true,
			    workers: 2
		    }
	    })
    );
}

const config = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/
				],
				include: PATHS.app,
				loader: 'babel-loader',
				query: {
					compact: true,
					cacheDirectory: true
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			}
		],
		rules: [
			{
				test: require.resolve('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
				loader: 'imports-loader?define=>false'
			}
		]
	},
	watch: !IS_PRODUCTION,
	watchOptions: {
		aggregateTimeout: 500
	},
	resolve: {
		extensions: ['.js'],
		modules: ['node_modules'],
		alias: {
			'TweenLite': appNodeModules + '/gsap/src/uncompressed/TweenLite.js',
			'TweenMax': appNodeModules + '/gsap/src/uncompressed/TweenMax.js',
			'ScrollToPlugin': appNodeModules + '/gsap/src/uncompressed/plugins/ScrollToPlugin.js',
			'Draggable': appNodeModules + '/gsap/src/uncompressed/utils/Draggable.js',
			// 'ScrollMagic': appNodeModules + 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
			'debug.addIndicators': appNodeModules + '/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js',
		},
	},
	plugins,
	devtool: IS_PRODUCTION ? false : '#eval',
	externals: {
		'../TweenLite': 'TweenLite',
		'./TweenLite': 'TweenLite',
		'TweenLite': 'TweenLite',
		'../TweenLite.min.js': 'TweenLite',
		'./TweenLite.min.js': 'TweenLite',
		'TweenLite.min.js': 'TweenLite',
		'../CSSPlugin': 'CSSPlugin',
		'./CSSPlugin': 'CSSPlugin',
		'CSSPlugin': 'CSSPlugin',
	}
};

export default config
