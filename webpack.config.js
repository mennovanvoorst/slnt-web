const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => ({
  entry: "./src/client/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      title: "SLNT.stream",
      description:
        "An All-in-One streaming platform that unleashes creative potential for your livestreams!"
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/client/assets", to: "assets" }]
    }),
    new Dotenv({
      path: `./.env${env.ENV !== "production" ? `.${env.ENV}` : ""}`
    })
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/hub/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },
  devServer: {
    static: "./build",
    compress: true,
    watchFiles: ["./src/client**"],
    hot: true,
    port: 3001,
    historyApiFallback: true
  }
});
