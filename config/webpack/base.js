const { environment } = require('@rails/webpacker')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

environment.plugins.append(
  'html',
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true
  })
)

environment.plugins.append(
  'html-harddisk',
  new HtmlWebpackHarddiskPlugin()
)

environment.config.merge({
  plugins: [new ForkTSCheckerWebpackPlugin()],
});

module.exports = environment
