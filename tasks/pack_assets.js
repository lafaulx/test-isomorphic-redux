'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');
var mkdirp = require('mkdirp');

module.exports.task = function (options) {
  return function (callback) {
    var config = Object.create(options.webpackConfig);
    var logPrefix = options.logPrefix;
    var statsOutput = options.statsOutput;
    var errored = false;

    config.plugins.push(new webpack.ProgressPlugin(function (progress, message) {
      if (!errored) {
        gutil.log(gutil.colors.cyan(logPrefix), message);
      }
    }));

    function reportHardError(err) {
      errored = true;
      callback(new gutil.PluginError(logPrefix, gutil.colors.red(err)));
    }

    function reportSoftError(err) {
      errored = true;
      gutil.log(gutil.colors.red(err));
    }

    function reportWarning(err) {
      gutil.log(gutil.colors.yellow(err));
    }

    webpack(config, function (err, stats) {
      if (err) {
        return reportHardError(err);
      }

      var statsJson = stats.toJson({
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        cached: true,
        reasons: true,
        chunkOrigins: true
      });

      if (statsJson.errors.length) {
        statsJson.errors.forEach(reportSoftError);
        callback(null, statsJson);
        return;
      }

      gutil.log(gutil.colors.cyan(logPrefix), stats.toString({
        colors: true
      }));

      if (statsJson.warnings.length) {
        statsJson.warnings.forEach(reportWarning);
      }

      mkdirp(path.dirname(statsOutput), function (mkdirErr) {
        if (mkdirErr) {
          return reportHardError(mkdirErr);
        }

        fs.writeFile(statsOutput, JSON.stringify(statsJson), 'utf-8', function (writeErr) {
          callback(writeErr, !writeErr && statsJson);
        });
      });
    });
  };
};