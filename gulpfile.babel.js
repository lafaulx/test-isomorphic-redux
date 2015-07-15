'use strict';

import gulp from 'gulp';
import lint from 'gulp-eslint';

require('./gulpfile.dev');
require('./gulpfile.dist');

/*eslint-disable no-empty */
try {
  require('./gulpfile.local');
} catch (err) { }
/*eslint-enable no-empty */

gulp.task('lint', () => {
  return gulp.src([
    'src/scripts/**/*.js',
    'src/scripts/**/*.jsx',
    '!src/scripts/vendor/**'
  ]).pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError());
});