const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo//src/index.js', // Point d'entrée principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Nettoie le dossier dist à chaque build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Fichiers JavaScript
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Fichiers CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Fichiers images
        type: 'asset/resource',
      },
      {
        test: /\.txt$/, // Fichiers texte
        use: 'raw-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Fichiers de polices
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Résolution des extensions pour éviter de les préciser
    alias: {
       
      '@components': path.resolve(__dirname, 'src/components/'),
      '@selectors': path.resolve(__dirname, 'src/selectors/'),
  
      // Désactive les source maps pour styled-components
      'styled-components': path.resolve(
        __dirname,
        'node_modules',
        'styled-components/dist/styled-components.browser.esm.js'
      ),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo/src/index.html'), // Fichier HTML à utiliser
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true, // Compression gzip
    port: 3000, // Port du serveur de développement
    open: true, // Ouvre le navigateur automatiquement
    hot: true, // Hot Module Replacement (HMR)
  },
  mode: 'development', // Mode par défaut
};
