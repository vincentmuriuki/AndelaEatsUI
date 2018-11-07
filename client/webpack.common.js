const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const outputPath = path.join(__dirname, "dist");
const port = process.env.PORT || 3000;

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, './src/index')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        }),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      favicon: 'src/assets/images/favicon.ico'
    }),
    new webpack.DefinePlugin({
      "process.env.CLOUDINARY_CLOUD_NAME": JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
      "process.env.CLOUDINARY_API_KEY": JSON.stringify(process.env.CLOUDINARY_API_KEY),
      "process.env.CLOUDINARY_API_SECRET": JSON.stringify(process.env.CLOUDINARY_API_SECRET),
      "process.env": {
        ...NODE_ENV
      }
    }),
    new ExtractTextPlugin("css/bundle.css")
  ],
};
