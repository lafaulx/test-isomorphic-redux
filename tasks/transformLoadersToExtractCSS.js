'use strict';

var update = require('react/lib/update');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function transformLoadersToExtractCSS(loaders) {
  var cssLoader = loaders.filter(function (loaderConfig) {
    return loaderConfig.loader === 'style!css?-minimize!postcss!less';
    // return loaderConfig.loader === 'style!css?modules&importLoaders=1&-minimize!postcss!less';
  })[0];

  return update(loaders, {
    $splice: [[
      loaders.indexOf(cssLoader),
      1,
      update(cssLoader, {
        loader: {
          $set: ExtractTextPlugin.extract('style', 'css?-minimize!postcss!less')
          // $set: ExtractTextPlugin.extract('style', 'style!css?modules&importLoaders=1&-minimize!postcss!less')
        }
      })
    ]]
  });
}

module.exports = transformLoadersToExtractCSS;