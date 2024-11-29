const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'umd'),
    filename: 'react-image-annotation.js',
    library: 'ReactImageAnnotation',
    libraryTarget: 'umd', // Génère un build UMD
    globalObject: 'this',
    clean: true,
  },
  externals: {
    react: 'React', // Empêche l'inclusion de React dans le bundle
    'react-dom': 'ReactDOM',
  },
  mode: 'production',
});
