const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'xuni', // 虚拟打包路径
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    contentBase: 'www'
  }
}