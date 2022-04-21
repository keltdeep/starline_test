const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
require('dotenv').config();

module.exports = merge.smart(common, {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    inline: true,
    historyApiFallback: true,
    port: 3001,
  },
  devtool: 'inline-sourcemap',
  optimization: {
    namedModules: true,
  },
  plugins: [
    new webpack.HotModulReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.REACT_APP_AXIOS_URL': JSON.stringify(
        process.env.REACT_APP_AXIOS_URL
      ),
    }),
  ],
  mode: 'development',
});
