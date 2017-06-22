'use strict';

module.exports = function() {
    $.gulp.task('copy:fonts', function() {
        return $.gulp.src($.config.source.fonts, { since: $.gulp.lastRun('copy:fonts') })
            .pipe($.gulp.dest($.config.build.fonts));
    });
};
