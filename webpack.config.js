// Path allows us to navigate the file system
// It's part of nodejs
const path = require("path");

// Import the plugin so we can use it in the config
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Add webpack so we can use HMR and webpack-dev-server
const webpack = require('webpack');

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      // Set up the rules for CSS Files
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    // Copy the images from src to dist
    new CopyWebpackPlugin(
      [{ from: './src/images/', to: 'assets/images/' }]
    ),
    // Copy html from src to dist
    new CopyWebpackPlugin(
      [{ from: './src/pages/', to: '' }]
    ),
    // Enable HMR
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    open: true // Automatically opens a browser window on start
  }
}