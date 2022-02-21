/**
 * @name webpack.dev.js
 * @description 测试环境调试组件webpack配置
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 创建HTML文件插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除dist目录插件
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './examples/main.js', // 入口
  },
  output: {
    path: path.resolve(process.cwd(), './examples/demo'), // 输出路径
    publicPath: '', // 打包后的前缀路径
    filename: '[name].[hash:8].bundle.js', // 打包文件命名
    chunkFilename: '[name].[hash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]--[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './examples/public/index.html', title: '组件本地测试' }), new CleanWebpackPlugin(), new VueLoaderPlugin()],
  devServer: {
    static: {
      directory: './examples/demo',
    },
    host: '0.0.0.0',
    port: 8989,
    hot: true,
  },
};
