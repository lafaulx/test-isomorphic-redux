'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer-core');

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: {
    main: ['./scripts/index', './scripts/requireProxy']
  },
  output: {
    // Export requireProxy as 'require' global
    // so it can be accessed from console and iframes
    library: 'require',
    libraryTarget: 'this'
  },
  plugins: [],
  externals: {},
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/scripts',
      'src/styles'
    ],
    extensions: ['', '.js', '.jsx', '.less']
  },
  module: {
    loaders: [
      { test: require.resolve('react'), loader: 'imports?shim5=es5-shim/es5-shim&sham5=es5-shim/es5-sham&shim6=es6-shim/es6-shim&sham6=es6-shim/es6-sham'},
      { test: /\.jsx?$/, loader: 'babel?stage=0&optional=runtime', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style!css?-minimize!postcss!less' }
    ]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 version', 'Opera >= 12', 'ie >= 9'],
    remove: false
  })]
};
