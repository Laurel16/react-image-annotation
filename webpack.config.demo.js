const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');

module.exports = merge(common, {
  entry: './demo/src/index.js', // Point d'entrée pour la démonstration
  output: {
    path: path.resolve(__dirname, 'demo/dist'),
    filename: 'demo.bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/src/index.html', // Fichier HTML pour la démo
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'demo/dist'),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  mode: 'development',
});
