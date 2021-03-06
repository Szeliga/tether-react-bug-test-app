var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: path.resolve(ROOT_PATH, 'app'),
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Design review',
      template: 'index.html',
      inject: 'body'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'react-hot',
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.resolve(ROOT_PATH, 'app'),
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react']
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
