var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './build/styles.css',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['client', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { include: /\.json$/, loaders: ['json-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test:
        /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'client')
    }]
  }
};
