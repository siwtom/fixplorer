const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")

module.exports = merge(common, {
	// Production mode activates following (at least):
	// - minimization (UglifyJs)
	// - tree shaking
	mode: "production"
})
