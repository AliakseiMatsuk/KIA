'use strict';

module.exports = function() {
    $.gulp.task('watch', function() {
        $.gulp.watch($.config.watch.html, $.gulp.series('pug'));
        $.gulp.watch($.config.watch.css, $.gulp.series('sass'));
        $.gulp.watch($.config.watch.fonts, $.gulp.series('copy:fonts'));
        $.gulp.watch($.config.watch.img, $.gulp.series('copy:image'));
        $.gulp.watch($.config.watch.spriteImg, $.gulp.series('sprite:img'));
        $.gulp.watch($.config.watch.spriteSvg, $.gulp.series('sprite:svg'));
        $.gulp.watch($.config.watch.js, $.gulp.series('js:process'));
    });
};
