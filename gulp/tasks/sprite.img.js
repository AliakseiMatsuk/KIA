'use strict';

module.exports = function() {
    $.gulp.task('sprite:img', function() {
        var spriteData = $.gulp.src($.config.source.spriteImg)
            .pipe($.gp.spritesmith({
                retinaSrcFilter: [$.config.source.spriteImgRetina],
                imgName: 'sprite-img.png',
                retinaImgName: 'sprite-img@2x.png',
                imgPath: '../images/sprite-img.png',
                retinaImgPath: '../images/sprite-img@2x.png',
                cssName: 'sprite-img.scss',
                padding: 5
            }));

        var imgStream = spriteData.img
            .pipe($.buf())
            .pipe($.gulp.dest($.config.build.spriteImg));

        var scssStream = spriteData.css
            .pipe($.gulp.dest($.config.build.spriteCss));

        return $.merge(imgStream, scssStream);
    });
};
