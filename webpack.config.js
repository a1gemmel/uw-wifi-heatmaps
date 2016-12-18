module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				}
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" },
		]
	},
	entry: "./src/index.js",
	output: {
		filename: "heatmaps.js",
		path: "./public"
	}
};
