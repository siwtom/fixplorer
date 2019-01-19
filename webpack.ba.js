const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const plugin = new BundleAnalyzerPlugin({
	analyzerPort: 3000
})

module.exports = merge(common, {
	mode: "production",
	plugins: [plugin]
})
