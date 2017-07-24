const {join, resolve} = require('path')

module.exports = {
  context: join(__dirname, 'app'),
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    path: resolve(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['css-loader'],
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.svg$/,
        loaders: ['svg-inline-loader']
      }
    ]
  }
}