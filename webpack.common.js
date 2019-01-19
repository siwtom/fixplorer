const path = require("path")
const webpack = require("webpack")

const DIST_DIR = path.resolve(__dirname, "dist")
const SRC_DIR = path.resolve(__dirname, "src")
const CUSTOM_MODULES_DIR = path.resolve(__dirname, "custom_modules")
const PUBLIC_DIR = path.resolve(__dirname, "public")

const includePaths = [
	SRC_DIR,
	CUSTOM_MODULES_DIR
]

module.exports = {
	entry: SRC_DIR + "/index.js",
	output: {
		path: DIST_DIR,
		filename: "bundle.js",
		// Virtual path that maps to the output.path.
		// publicPath: "/dist/",
		publicPath: "/",
	},
	resolve: {
		// Import modules without needing to add their extensions.
		extensions: ["*", ".js", ".jsx"]
	},
	module: {
		rules: [
			// Invoke babel compiler.
			{
				test: /\.(js|jsx)$/,
				include: includePaths,
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/env",  // ES6
						"@babel/react"  // JSX
					],
					"plugins": [
						"@babel/plugin-proposal-class-properties"  // classProperties
					]
				}
			},
			{
				test: /\.css$/,
				// 'css-loader' requires 'style-loader'.
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {}
					}
				]
			}
		]
	},
}
