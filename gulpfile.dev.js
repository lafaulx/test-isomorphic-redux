'use strict';

var path = require('path');
var update = require('react/lib/update');
var gulp = require('gulp');
var webpack = require('webpack');
var prepareHTML = require('./tasks/prepare_html');
var webpackServe = require('./tasks/webpack_serve');
var webpackConfig = require('./webpack.config.js');
var config = require('./local_config.js');

var SRC_ROOT = 'src';

gulp.task('html:dev', prepareHTML.task({
  src: SRC_ROOT,
  dest: path.join(process.cwd(), config.DEV_DEST_ROOT),
  files: [path.join(SRC_ROOT, '*.dev.html')],
  context: function () {
    return {
      PORT: config.DEV_SERVER_PORT
    };
  }
}));

gulp.task('watch:dev', function () {
  gulp.watch('src/*.html', ['html:dev']);
});

gulp.task('server:dev', ['html:dev', 'watch:dev'], webpackServe.task({
  config: config,
  webpackConfig: update(webpackConfig, {
    debug: {
      $set: true
    },
    devtool: {
      $set: 'eval'
    },
    output: {
      $merge: {
        path: path.join(process.cwd(), config.DEV_DEST_ROOT, 'assets'),
        publicPath: 'http://localhost:' + config.DEV_SERVER_PORT + '/assets/',
        filename: 'main.js'
      }
    },
    module: {
      loaders: {
        $splice: [[
          0,
          0,
          { test: /\.jsx?$/, loader: 'react-hot', exclude: /node_modules/ }
        ]]
      }
    },
    plugins: {
      $push: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          '__DEV__': true
        })
      ]
    },
    entry: {
      main: {
        $splice: [[
          0,
          0,
          'webpack/hot/only-dev-server'
        ]]
      }
    }
  })
}));

gulp.task('default', ['server:dev']);