const path = require('path')

module.exports = Object.assign({
  entry: './example',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    ]
  },
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '../'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 6001,
    disableHostCheck: true,
    open: true,
    overlay: { warnings: false, errors: true }
  },
  devtool: 'cheap-eval-source-map'
}, require('./webpack.base'))
