'use strict';

var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports.task = function (options) {
  return function () {
    var wpConfig = Object.create(options.webpackConfig);
    var localURL = 'http://localhost:' + options.config.DEV_SERVER_PORT;

    var server;

    server = new WebpackDevServer(webpack(wpConfig), {
      contentBase: options.config.DEV_DEST_ROOT,
      publicPath: wpConfig.output.publicPath,
      hot: true,
      stats: {
        colors: true
      }
    });

    server.listen(options.config.DEV_SERVER_PORT, '0.0.0.0', function (err) {
      if (err) {
        throw new gutil.PluginError('server', err);
      }

      gutil.log('[server]', localURL + '/webpack-dev-server/');
    });

    server.app.use('*', function (req, res, next) {
      var hostname = 'localhost';
      var port = options.config.DEV_SERVER_PORT;
      res.set({ 'Access-Control-Allow-Origin': 'http://' + hostname + ':' + port });
      next();
    });
  };
};