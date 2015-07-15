'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var render = require('gulp-nunjucks-render');
var nunjucks = render.nunjucks;

module.exports.task = function (options) {
  return function () {
    nunjucks.configure(options.src, {
      watch: false
    });

    var context;
    if (options.context) {
      context = options.context();
    }

    return gulp.src(options.files, { base: options.src })
      .pipe(render(context))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/\.dev|\.dist/, '');
      }))
      .pipe(gulp.dest(options.dest));
  };
};