const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign({
  entry: './src',
  output: {
    library: 'VueGDrive',
    libraryTarget: 'umd',
    filename: 'vue-gdrive.js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  ]
}, require('./webpack.base'))
