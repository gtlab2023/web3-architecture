const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');

module.exports = {
  stats: 'errors-only',
  output: {
    publicPath: '/',
    //如果是通过loader 编译的 放到scripts文件夹里 filename
    filename: 'scripts/[name].bundle.js',
    //如果是通过'asset/resource' 编译的
    assetModuleFilename: 'images/[name].[ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-prod.html'),
    }),
  ],

};
