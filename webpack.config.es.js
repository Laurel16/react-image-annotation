const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'es'),
    filename: 'index.js',
    libraryTarget: 'module', // Génère des ES Modules
    environment: {
      module: true, // Active les fonctionnalités ES Modules modernes
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  mode: 'production',
});
