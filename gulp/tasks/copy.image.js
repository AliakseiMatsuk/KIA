'use strict';

module.exports = function() {
    $.gulp.task('copy:image', function() {
        return $.gulp.src($.config.source.img, { since: $.gulp.lastRun('copy:image') })
            .pipe($.gp.imagemin())
            .pipe($.gulp.dest($.config.build.img));
    });
};
