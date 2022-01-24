/**
 * @name webpack.prod.js
 * @description 组件打包webpack配置
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    library: 'KCOMPONENTS', // 指定使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'kComponents',
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
