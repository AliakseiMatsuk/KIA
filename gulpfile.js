'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  gulp: require('gulp'),
  del: require('del'),
  buf: require('vinyl-buffer'),
  merge:require('merge-stream'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')(),
  path: {
      task: require('./gulp/paths/tasks.js'),
      jsFoundation: require('./gulp/paths/js.foundation.js'),
      cssFoundation: require('./gulp/paths/css.foundation.js'),
      app: require('./gulp/paths/app.js')
  }
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sprite:img',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'pug',
    'sass',
    'css:foundation',
    'js:foundation',
    'js:process'
  ),
  $.gulp.parallel(
    'copy:image',
    'copy:fonts'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
