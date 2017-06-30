var path = require ('path');
var HtmlWebpackPlugin = require ('html-webpack-plugin'); //creates a html url
var webpack = require('webpack');

var config = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HtmlWebpackPlugin ({
		template: 'app/index.html'
	})]
};

//production
if(process.env.NODE_ENV === 'production') {
	config.plugins.push (
		new webpack.DefinePlugin ({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),

		new webpack.optimize.UglifyJsPlugin()
	)
}

//when webpack runs, it will put the index.html in to the dist folder
// and include a script that will reference the index_bundle.js. Webpack will use the index.html file
// as a template

// rules are the transformations/loaders that you want to create

module.exports = config;