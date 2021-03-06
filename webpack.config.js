const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    login: "./src/js/login.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
      filename: "index.html",
      // hash: true,
      chunks: ["index","jquery"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/login.pug",
      filename: "login.html",
      // hash: true,
      chunks: ["login","jquery"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(html|pug|jade)$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.(s?css|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|webm|mp4|ogg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "img/[name].[ext]?[hash:7]"
            }
          },
          "image-webpack-loader"
        ]
      }
    ]
  }
  // devServer: {
  // 	port: 9000,
  // 	hot: true,
  // 	hotOnly: true
  // },
  // devtool: 'source-map'
};
