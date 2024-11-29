const path = require('path');

module.exports = {
  entry: './src/index.js', // Point d'entrée principal
  resolve: {
    extensions: ['.js', '.jsx'], // Résolution des extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Fichiers JavaScript/JSX
        exclude: /node_modules/,
        use: 'babel-loader', // Utilise Babel pour transpiler JS/JSX
      },
      {
        test: /\.css$/, // Fichiers CSS
        use: ['style-loader', 'css-loader'], // Chargeurs CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Fichiers images
        type: 'asset/resource',
      },
      {
        test: /\.txt$/, // Fichiers texte
        use: 'raw-loader',
      },
    ],
  },
};
