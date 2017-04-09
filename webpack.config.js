var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'index.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader'	
			}
		}]
	}
}

