const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

process.env.NODE_ENV = 'production'

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "virtualList.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    library: "virtualList", // 指定使用require时的模块名
    libraryTarget: "umd", // 指定输出格式
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "virtualList",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
