const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const path = require("path")

const PUBLIC_DIR = path.resolve(__dirname, "public")

module.exports = merge(common, {
	mode: "development",
	devtool: "eval-source-map",
	devServer: {
		// Directory of the static public (non-webpack) content.
		contentBase: PUBLIC_DIR,
		port: 3000,
		// Serve index.html in place of any 404 responses. react-router needs this.
		historyApiFallback: true,
		// Enable HMR.
		hot: true
		// Enable HMR without page refresh as fallback in case of build failures.
		// hotOnly: true,
	},
	// Needed to enable HMR.
	plugins: [new webpack.HotModuleReplacementPlugin()]
})
