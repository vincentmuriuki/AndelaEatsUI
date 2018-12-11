const webpack = require('webpack');
const merge = require('webpack-merge');
const dotEnv = require('dotenv');

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
} = dotEnv.config().parsed;

const { NODE_ENV } = process.env;

const webpackCommonConfig = require('./webpack.common');

module.exports = merge(webpackCommonConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.CLOUDINARY_CLOUD_NAME": JSON.stringify(CLOUDINARY_CLOUD_NAME),
      "process.env.CLOUDINARY_API_KEY": JSON.stringify(CLOUDINARY_API_KEY),
      "process.env.CLOUDINARY_API_SECRET": JSON.stringify(CLOUDINARY_API_SECRET),
      "process.env.CLOUDINARY_URL": JSON.stringify(CLOUDINARY_URL),
      "process.env": {
        ...NODE_ENV
      }
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
  ],
  devtool: "source-map",
});
