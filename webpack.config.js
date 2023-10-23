const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

/**
 * @type {webpack.Configuration}
 */
let options = {
  mode,
  entry: {
    content: path.join(__dirname, "src/app/content/index.ts"),
    popup: path.join(__dirname, "src/app/popup/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ verbose: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/app/popup/index.html"),
      filename: "popup.html",
      chunks: ["popup"],
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
          transform(content) {
            console.log(process.env.npm_package_version);
            return JSON.stringify(
              {
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              },
              null,
              0
            );
          },
        },
      ],
    }),
  ],
};

if (mode === "development") {
  options.devtool = "cheap-module-source-map";
}
if (mode === "production") {
  options.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = options;
