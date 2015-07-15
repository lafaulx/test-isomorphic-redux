'use strict';

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var update = require('react/lib/update');
var prepareHTML = require('./tasks/prepare_html');
var packAssets = require('./tasks/pack_assets');
var forEach = require('lodash-node/modern/collections/forEach');
var flatten = require('lodash-node/modern/arrays/flatten');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = require('./webpack.config.js');
var config = require('./local_config.js');
var transformLoadersToExtractCSS = require('./tasks/transformLoadersToExtractCSS');

var SRC_ROOT = 'src';

gulp.task('clean:dist', function () {
  return gulp
    .src([path.join(process.cwd(), config.DIST_DEST_ROOT)], { read: false })
    .pipe(rimraf());
});

gulp.task('assets:dist', ['clean:dist'], packAssets.task({
  logPrefix: '[assets:dist]',
  statsOutput: path.join(process.cwd(), config.DIST_DEST_ROOT, 'webpack-stats.json'),
  webpackConfig: update(webpackConfig, {
    bail: {
      $set: true
    },
    output: {
      $merge: {
        path: path.join(process.cwd(), config.DIST_DEST_ROOT, 'assets'),
        publicPath: '/assets/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.[chunkhash].js'
      }
    },
    module: {
      loaders: {
        $apply: transformLoadersToExtractCSS
      }
    },
    plugins: {
      $push: [
        new webpack.SourceMapDevToolPlugin(
          '[file].map[query]',
          null,
          'webpack:///[resourcePath]?[loaders]'
        ),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          },
          '__DEV__': false
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          },
          sourceMap: false
        })
      ]
    }
  })
}));

gulp.task('html:dist', ['clean:dist', 'assets:dist'], prepareHTML.task({
  src: SRC_ROOT,
  dest: path.join(process.cwd(), config.DIST_DEST_ROOT),
  files: [path.join(SRC_ROOT, '*.dist.html')],
  context: function () {
    var webpackStatsPath = path.join(process.cwd(), config.DIST_DEST_ROOT, 'webpack-stats.json');
    var webpackStats = JSON.parse(fs.readFileSync(webpackStatsPath, 'utf8'));
    var revved = {};

    // Gather all resources revved by Webpack (app scripts)
    // Stats format: {"assetsByChunkName": {"app": ["1.chunk.1dcc48763e98f59f00e6.js", ...], ...}}
    forEach(webpackStats.assetsByChunkName, function (assets, chunkName) {
      assets = flatten([assets]);
      assets = assets.filter(function (asset) {
        return ['.js', '.css'].indexOf(path.extname(asset)) > -1;
      });

      if (!assets.length) {
        throw new Error('No files emitted for a chunk: ' + chunkName);
      }

      assets.forEach(function (asset) {
        revved['/assets/' + chunkName + path.extname(asset)] = path.join('/assets', asset);
      });
    });

    function getRevved(name) {
      if (!revved[name]) {
        console.log('Known assets:', revved);
        throw new Error('Unknown asset key: ' + name);
      }

      return revved[name];
    }

    return {
      getRevved: getRevved
    };
  }
}));

gulp.task('build', ['html:dist']);